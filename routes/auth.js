const
    express = require('express'),
    router = express.Router(),
    passport = require("passport"),
    twitchStrat = require("passport-twitch").Strategy
    

// Passport configuration
    passport.use(new twitchStrat({
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        "scope": "user_read"
    },
        function (accessToken, refreshToken, profile, done) {
            var userObj = {
                accessToken,
                profile
            }
            return done(null, userObj)
        }
    ));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


//routes for authentication
router.get("/login", passport.authenticate("twitch"));

router.get("/callback", passport.authenticate("twitch", {
    failureRedirect: "/fail"}), (req, res) => {
       res.redirect(process.env.CALLBACK_URL)
});  



router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(process.env.CALLBACK_URL)
})


module.exports = router
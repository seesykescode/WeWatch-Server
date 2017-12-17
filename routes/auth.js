const
    express = require('express'),
    router = express.Router(),
    passport = require("passport"),
    twitchStrat = require("passport-twitch").Strategy
    
console.log(`${process.env.BASE_URL}/auth/callback`)
// Passport configuration
    passport.use(new twitchStrat({
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/auth/callback`,
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
       res.redirect(process.env.APP_URL)
});  



router.get('/logout', (req, res) => {
    req.logout()
})


module.exports = router
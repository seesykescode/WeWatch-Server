const
    express = require('express'),
    router = express.Router(),
    passport = require("passport"),
    twitchStrategy = require("passport-twitch").Strategy
    

// Passport configuration
    passport.use(new twitchStrategy({
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: "https://we-watch-twitch-server.herokuapp.com/auth/callback",
        scope: "user_read"
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
    failureRedirect: "/",
    successRedirect: "/"
}), (req, res) => {
});

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


module.exports = router
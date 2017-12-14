const
    express = require('express'),
    router = express.Router(),
    api = require('twitch-api-v5')

api.clientID = process.env.TWITCH_CLIENT_ID

router.get('/', (req, res) => {
    if (req.isAuthenticated()) res.json(req.user.profile)
    else res.json("You are not logged in. Please attempt to log-in and try again")
})

router.get('/streams', (req, res) => {
    if (req.isAuthenticated()) {
        api.auth.checkToken({ auth: req.user.accessToken }, (err, status) => {
            if (status.token.valid) {
                api.streams.followed({ auth: req.user.accessToken }, (err, streamData) => {
                    res.json(streamData)
                })
            }
        })

    } else {
        res.json("You are not logged in. Please attempt to log-in and try again")
    }


})


module.exports = router
const
    express = require('express'),
    router = express.Router(),
    api = require('twitch-api-v5')

api.clientID = process.env.TWITCH_CLIENT_ID

router.get('/', (req, res) => {
    if (req.isAuthenticated()) res.json(req.user.profile)
    else res.json("You are not logged in. Please attempt to log-in and try again")
})

router.get('/validate', (req, res) => {
    const userToken = req.user.accessToken
    if (req.isAuthenticated()) {
        //check to make sure the user token is valid. 
        //required by Twitch API on EVERY request to API
        api.auth.checkToken({ auth: req.user.accessToken }, (err, tokenResponse) => {
            res.json(tokenResponse)
        })

    } else {
        res.json("You are not logged in. Please attempt to log-in and try again")
    }
})

router.get('/search/:id', (req, res) => {
    console.log(req.params.id)
    api.users.usersByName({ users: req.params.id}, (err, apiResponse) => {
        res.json(apiResponse.users)
    })
})


router.get('/streams', (req, res) => {
    api.streams.followed({auth: req.user.accessToken}, (err, apiResponse) => {
        res.json(apiResponse.streams)
    })
})

router.get('/streams/featured', (req, res) =>{
    api.streams.live({limit: 20}, (err, apiResponse) => {
        res.json(apiResponse.streams)
    })
})


module.exports = router
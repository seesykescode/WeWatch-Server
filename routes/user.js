const
    express = require('express'),
    router = express.Router()

router.get('/', (req, res) => {
    if (req.isAuthenticated()) res.json(req.user.profile)
    else res.json("You are not logged in. Please attempt to log-in and try again")
})

module.exports = router
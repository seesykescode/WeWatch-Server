const 
    express=require('express'),
    app = express();
    morgan=require('morgan'), 
    cookieParser = require("cookie-parser"),
    cookieSession = require("cookie-session"),
    bodyParser = require('body-parser'),
    passport = require("passport"),
    twitchStrategy = require("passport-twitch").Strategy,
    port = 3000 || process.env.PORT

    // session configuration and middleware
require('dotenv').config()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cookieSession({ secret:"realitygem", resave: false, saveUninitialized: false }))
app.use(express.static("./public"));  
app.use(passport.initialize());
app.use(passport.session());

//route controllers
const authRoutes = require('./routes/auth')
const streamRoutes = require('./routes/user')


//routes
app.get("/", (req, res) => {
    if (!req.user) res.json("Not logged in...")
    else res.json("Logged in and ready to go...")
})

app.use('/auth', authRoutes)
app.use('/streams', streamRoutes)



    //app listener
    app.listen(port, (err)=>{
        console.log(err||`Connected to server on port ${port}`)
    })
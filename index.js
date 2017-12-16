const 
    express=require('express'),
    app = express();
    cors = require('cors'),
    morgan=require('morgan'), 
    cookieParser = require("cookie-parser"),
    cookieSession = require("cookie-session"),
    bodyParser = require('body-parser'),
    passport = require("passport"),
   
    port = process.env.PORT || 3001

    // session configuration and middleware
require('dotenv').config()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cookieSession({ secret:"realitygem", resave: false, saveUninitialized: false }))  
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("./public"));



//route controllers
const authRoutes = require('./routes/auth'),
      userRoutes = require('./routes/user')

const corsOptions = {
    origin: true,
    credentials: true
}

app.use(cors(corsOptions));

//routes
app.get("/", (req, res) => {
    if (!req.user) res.json("Not logged in...")
    else res.json("Logged in and ready to go...")
})

app.use('/auth', authRoutes)
app.use('/user', userRoutes)



    //app listener
    app.listen(port, (err)=>{
        console.log(err||`Connected to server on port ${port}`)
    })



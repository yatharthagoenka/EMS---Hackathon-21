if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const passport              =  require("passport"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      User                  =  require("./models/user");

const indexRouter = require('./routes/index')
const tagRouter = require('./routes/tags')
const eventRouter = require('./routes/events')
const reviewRouter = require('./routes/reviews') 
const contactRouter = require('./routes/contact') 


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb',extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('Connected to Mongoose'))


/*
dgeafvWEMNFMWE
FOIWENMFOWNEFO
ESDFOIAMGVOIRWMGVOI
GMVDOIMVOWEAIMFWEAP*/




//Connecting database user
// mongoose.connect("mongodb://localhost/auth_demo",{useNewUrlParser: true,useUnifiedTopology: true});
app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));

const db2 = mongoose.connection
db2.on('error',error=>console.error(error))
db2.once('open',()=>console.log('Connected to Mongoose for Users'))

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req,res) =>{
    res.render("auth/home");
})

// app.get("/userprofile",isLoggedIn ,(req,res) =>{
//     res.render("index",{username: req.user.username });
// })

//Auth Routes
app.get("/login",(req,res)=>{
    res.redirect("/");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/index",
    failureRedirect:"/login"
}),function (req, res){
});
app.get("/register",(req,res)=>{
    res.redirect("/");
});
app.post("/",(req,res)=>{
    
    User.register(new User({username: req.body.username,phone:req.body.phone,email: req.body.email}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/");
        }
    passport.authenticate("local")(req,res,function(){
        res.redirect("/");
    })    
    })
})
app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});


app.use('/index', indexRouter)
app.use('/tags', tagRouter)
app.use('/events', eventRouter)
app.use('/reviews',reviewRouter)
app.use('/contact',contactRouter)

// function isLoggedIn(req,res,next) {
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

//Listen On Server
app.listen(process.env.PORT ||3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");
    }
});

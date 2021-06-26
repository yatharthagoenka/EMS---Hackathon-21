const express = require('express')
const router = express.Router()
const Event = require('../models/events')
const User =  require("../models/user")

router.get('/',isLoggedIn, async(req, res) => {
    let events
    try{
        events = await Event.find().sort({timeline:'desc'}).limit(4).exec()
    }catch{
        events = []
    }
    res.render('index', {events: events,username: req.user.username})
})

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = router
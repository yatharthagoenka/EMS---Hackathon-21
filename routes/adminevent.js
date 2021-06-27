const express = require('express')
const router = express.Router()

router.get('/',isLoggedIn, async(req, res) => {
    res.render('adminevents/index')
})

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = router
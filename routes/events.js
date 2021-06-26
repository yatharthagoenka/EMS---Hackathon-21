const { render } = require('ejs')
const express = require('express')
const alert = require('alert')
const router = express.Router()
const Event = require('../models/events')
const Tag = require('../models/tags')
const User =  require("../models/user")
const imageMimeTypes = ['image/jpeg','image/png','image/gif']

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

// All events
router.get('/',isLoggedIn, async (req, res) => {
    let query = Event.find()
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    try{
        const events = await query.exec()
        res.render('events/index',{
            events: events,
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
    
})

// New events
router.get('/new',isLoggedIn,async(req,res)=>{
    renderNewEvent(res, new Event())
})

// Create events route 
router.post('/',isLoggedIn,async(req,res)=>{
    const event = new Event({
        title: req.body.title,
        tag: req.body.tag,
        timeline: new Date(req.body.timeline),
        description: req.body.description,
        username: req.user.username      
    })
    saveCover(event,req.body.cover)
    try{
        const newEvent = await event.save()
        res.redirect(`events/${newEvent.id}`)
    }catch{
        renderNewEvent(res, event, true)
    }
})

// View event route
router.get('/:id',isLoggedIn,async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id).populate('tag').exec()
        res.render('events/show',{event:event})
    }catch(err){
        console.log(err)
        redirect('/')
    }
})

// Edit event Route
router.get('/:id/edit',isLoggedIn,async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id)
        renderEditPost(res, event)
    }catch{
        res.redirect('/')
    }
    
})

// Update event route 
router.put('/:id',isLoggedIn,async(req,res)=>{
    let event
    try{
        event = await Event.findById(req.params.id)
        if(req.user.username!=req.body.username && req.user.username!="yGoenkaa"){
            // res.send('You are not authorized to edit this post')
            alert("You are not authorized to edit this post")
            res.redirect('/events')
            return
        }
        event.title = req.body.title
        event.username = req.body.username
        event.tag = req.body.tag
        event.timeline = new Date(req.body.timeline)
        event.description = req.body.description
        if(req.body.cover != null && req.body.cover !== ''){
            saveCover(event, req.body.cover)
        }
        await event.save()
        res.redirect(`/events/${event.id}`)
    }catch{
        if(event!=null){
            renderEditPost(res, event, true)
        }else{
            redirect('/')
        }
    }
})

// Delete Post Route
router.delete('/:id',isLoggedIn, async(req,res)=>{
    let event
    try{
        event = await Event.findById(req.params.id)
        if(req.user.username!=event.username && req.user.username!="yGoenkaa"){
            // res.send('You are not authorized to edit this event')
            alert("You are not authorized to delete this post")
            res.redirect('/events')
            return
        }
        await event.remove()
        res.redirect('/events')
    }catch{
        if(event!=null){
            res.render('events/show',{
                event: event,
                errorMessage: 'Could not delete post'
            })
        }else{
            res.redirect('/')
        }
    }
})

// Upload single is saying that we're uploading a single file through the input field of name cover : upload.single('cover')
// Commented portions are no longer included bcs we are using filepond that is sending image as an encoded string 

async function renderNewEvent(res, event, hasError = false){
    try{
        const tags = await Tag.find({})
        const params = {
            tags: tags,
            event: event
        }
        if(hasError){
            if(form === 'edit'){
                params.errorMessage = 'Error Updating event'
            }else[
                params.errorMessage = 'Error Creating event'
            ]
        } 
        res.render('events/new', params)
    }catch{
        res.redirect('/events')
    }
}

async function renderEditPost(res, event, hasError = false){
    try{
        const tags = await Tag.find({})
        const params = {
            tags: tags,
            event: event
        }
        if(hasError) params.errorMessage = 'Error Uploading event'
        res.render('events/edit', params)
    }catch{
        res.redirect('/events')
    }
}

function saveCover(event, coverEncoded){
    if(coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if(cover != null && imageMimeTypes.includes(cover.type)) {
        event.coverImage = new Buffer.from(cover.data, 'base64')
        event.coverImageType = cover.type
    }
}

module.exports = router 
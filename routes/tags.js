const express = require('express')
const Event = require('../models/events')
const router = express.Router()

const Tag = require('../models/tags')

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

// All tags
router.get('/',isLoggedIn, async (req, res) => {
    let searchOptions = {}
    if(req.query.name!=null && req.query.name!==''){
        searchOptions.name = new RegExp(req.query.name, 'i') 
    }
    try{
        const tags = await Tag.find(searchOptions)
        res.render('tags/index',{
            tags: tags, 
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
    
})

// New tags
router.get('/new',isLoggedIn,(req,res)=>{
    res.render('tags/new', {tag: new Tag()})
})

// Post/Create tag route 
router.post('/',isLoggedIn,async(req,res)=>{
    const tag = new Tag({
        name: req.body.name
    })
    try {
        const newTag = await tag.save()
        res.redirect(`tags/${newTag.id}`)
        // res.redirect('tags')
    } catch {
        res.render('tags/new',{
            tag: tag,
            errorMessage: 'Error creating Tag'
        })
    }
})

// Show individual tags route
router.get('/:id',isLoggedIn,async(req,res)=>{
    // res.send('Show Tag: ' + req.params.id)
    try{
        const tag = await Tag.findById(req.params.id)
        const events = await Event.find({tag : tag.id}).limit(5).exec()
        res.render('tags/show',{
            tag: tag,
            eventsByTag: events
        })
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
})

// Edit tags route
router.get('/:id/edit', isLoggedIn,async(req,res)=>{
    try{
        const tag = await Tag.findById(req.params.id)
        res.render('tags/edit', {tag: tag})
    }catch{
        res.redirect('/tags')
    }
})

// Update tags route
//Here we dont put /:id/edit bcs the put method automatically tells the sys that this is an edit route 
router.put('/:id',isLoggedIn,async(req,res)=>{
    let tag
    try {
        tag = await Tag.findById(req.params.id)
        tag.name = req.body.name
        await tag.save()
        res.redirect(`/tags/${tag.id}`)
    } catch {
        if(tag==null){
            res.redirect('/')
        }else{
            res.render('tags/edit',{
                tag: tag,
                errorMessage: 'Error updating Tag'
            })
        }
    }
})

// Delete tags route
// The reason we dont use .get with delete methods and instead download a library to implement .delete is bcs
// when running on google's browser, it clicks on every .get method for trial as soon as we upload
// So if we put delete method in .get, it with click on everything and delete them
router.delete('/:id',isLoggedIn,async(req,res)=>{
    let tag
    try {
        tag = await Tag.findById(req.params.id)
        await tag.remove()
        res.redirect(`/tags`)
    } catch {
        if(tag==null){
            res.redirect('/')
        }else{
            res.redirect(`/tags/${tag.id}`)
        }
    }
})

module.exports = router 
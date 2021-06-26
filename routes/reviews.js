const express = require('express')
const router = express.Router()
const Review = require('../models/reviews')

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

// All reviews
router.get('/',isLoggedIn, async (req, res) => {
    let searchOptions = {}
    if(req.query.username!=null && req.query.username!==''){
        searchOptions.username = new RegExp(req.query.username, 'i') 
    }
    try{
        const reviews = await Review.find(searchOptions)
        res.render('reviews/index',{
            reviews: reviews, 
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
})

// New review
router.get('/new',isLoggedIn,(req,res)=>{
    res.render('reviews/new', {review: new Review()})
})

// Post/Create tag route 
router.post('/',isLoggedIn,async(req,res)=>{
    const review = new Review({
        keyword: req.body.keyword,
        comment: req.body.comment,
        username: req.user.username,
        rating: req.body.rating
    })
    try {
        const newReview = await review.save()
        res.redirect(`/reviews`)
        // res.redirect('tags')
    } catch {
        res.render('reviews/new',{
            review: review,
            errorMessage: 'Error posting Review'
        })
    }
})

// Edit tags route
router.get('/:id/edit', isLoggedIn,async(req,res)=>{
    try{
        const review = await Review.findById(req.params.id)
        res.render('reviews/edit', {review: review})
    }catch{
        res.redirect('/reviews')
    }
})

// Update tags route
//Here we dont put /:id/edit bcs the put method automatically tells the sys that this is an edit route 
router.put('/:id',isLoggedIn,async(req,res)=>{
    let review
    try {
        review = await Review.findById(req.params.id)
        review.keyword = req.body.keyword
        review.username = req.user.username
        review.rating = req.body.rating
        review.comment = req.body.comment
        await review.save()
        res.redirect(`/reviews`)
    } catch {
        if(review==null){
            res.redirect('/')
        }else{
            res.render('reviews/edit',{
                review: review,
                errorMessage: 'Error updating Comment'
            })
        }
    }
})

// Delete tags route
// The reason we dont use .get with delete methods and instead download a library to implement .delete is bcs
// when running on google's browser, it clicks on every .get method for trial as soon as we upload
// So if we put delete method in .get, it with click on everything and delete them
router.delete('/:id',isLoggedIn,async(req,res)=>{
    let review
    try {
        review = await Review.findById(req.params.id)
        if(req.user.username!=review.username && req.user.username!="yGoenkaa"){
            // res.send('You are not authorized to edit this post')
            alert('You are not authorized to delete this review')
            console.log("not authorized")
            res.redirect('/reviews')
            return
        }
        await review.remove()
        res.redirect(`/reviews`)
    } catch {
        if(review==null){
            res.redirect('/')
        }else{
            res.redirect(`/reviews`)
        }
    }
})

module.exports = router 
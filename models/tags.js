const mongoose = require('mongoose')
// const Post = require('./posts')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// tagSchema.pre('remove',function (next){
//     Post.find({tag: this.id}, (err, posts) => {
//         if(err) {
//             next(err)
//         }
//         else if(posts.length>0){
//             next(new Error('This tag is still associated with a post'))
//         }else{
//             next()
//         }
//     })
// })

module.exports = mongoose.model('Tag',tagSchema)

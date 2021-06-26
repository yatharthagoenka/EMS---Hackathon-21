const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/eventCovers'

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    timeline: {
        type: Date,
        required: true
    },
    tag:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tag'
    },
    coverImage:{
        type: Buffer,
        required: true
    },
    coverImageType:{
        type: String,
        required: true
    }
})

eventSchema.virtual('coverImagePath').get(function() {
    if(this.coverImage != null && this.coverImageType != null){
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Event', eventSchema)

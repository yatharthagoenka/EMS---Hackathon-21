const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Review",ReviewSchema);
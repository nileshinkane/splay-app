const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        minlength: 4,
    },
    link: {
        type: String,
        required: "Youtube embed Link is required !",
    },
    likedBy: {
        type: Array,
    },
    description: {
        type: String,
        // required: "Title is required",
        minlength: 3,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Video", videoSchema);
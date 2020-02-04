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
        type: String,
    }, 
    description: {
        type: String,
        required: "Title is required",
        minlength: 3,
    },
})

module.exports = mongoose.model("Video", videoSchema);
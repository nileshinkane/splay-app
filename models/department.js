const mongoose = require('mongoose');


const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        unique: true
    },
    displayName: {
        type: String,
        minlength: 3,
    },
    description: {
        type: String,
        required: "Description is required !",
    },
})

module.exports = mongoose.model("Department", departmentSchema);
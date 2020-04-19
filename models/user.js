const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    Admission_Number: {
        type: Number,
        required: "Student ID is required"
    },
    Student_Name: {
        type: String,
        required: "Student Name is required !"
    },
    hashed_password: {
        type: String,
        required: "Password is required !"
    },
    salt: String,
    Email: {
        type: String
    }
})

userSchema.virtual('password')
    .set(function (password) {
        //create a temporary variable called _password
        this._password = password
        //generate a timestamp
        this.salt = uuidv1()

        //encrypt password
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

//Methods
userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }
        catch (err) {
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema);
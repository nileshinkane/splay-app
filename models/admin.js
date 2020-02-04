const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');


const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Username is required",
        minlength: 3
    },
    email: {
        type: String,
        required: "Email is required",
        minlength: 4,
    },
    hashed_password: {
        type: String,
        required: "Password is required !",
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})

adminSchema.virtual('password')
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
adminSchema.methods = {
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

module.exports = mongoose.model("Admin", adminSchema);
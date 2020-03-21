const jwt = require('jsonwebtoken');
require('dotenv').config();
const Admin = require("../models/admin");
const expressJwt = require('express-jwt');



exports.signup = async (req, res) => {
    const adminExists = await Admin.findOne({ email: req.body.email });

    if (adminExists)
        return res.status(403).json({
            error: "Email is taken"
        })

    const admin = await new Admin(req.body);
    await admin.save();
    res.status(200).json({ admin });
}

exports.signin = (req, res) => {
    //Find the admin based on the username
    const { username, password } = req.body;
    Admin.findOne({ username }, (err, admin) => {

        if (err || !admin) {
            return res.status(401).json({
                error: "User not found !"
            })
        }

        // if admin is found, the username and passwords are verified via authenticate method in model
        if (!admin.authenticate(password)) {
            return res.status(401).json({
                error: "Username and Password do not match !"
            })
        }
        //generate a token with admin id and secret
        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

        //persist the token in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 })

        //return the response to frontend 
        const { _id, name, username } = admin;

        return res.json({ token, admin: { _id, username, name } })
    })
}

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Singout Success" })
}

exports.requireSignin = expressJwt({
    // if the token is valid, expressjwt appends the verified admin id in an auth key to the request object
    secret: process.env.JWT_SECRET,
    adminProperty: "adminAuth"
})
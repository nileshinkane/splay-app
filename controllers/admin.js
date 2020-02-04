const Admin = require('../models/admin')
const _ = require('lodash')

exports.adminById = (req, res, next, id) => {
    Admin.findById(id).exec((err, admin) => {
        if (err || !admin) {
            return res.status(400).json({
                error: "Admin not found"
            })
        }

        req.profile = admin; // Adds profile object in req with admin info
        next()
    })
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth_.id;

    if (!authorized) {
        return res.status(403).json({ error: 'Admin is not authoried to perform this action !' })
    }
}


exports.getAdmin = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile)
}

exports.updateAdmin = (req, res, next) => {
    let admin = req.profile;
    admin = _.extend(admin, req.body)
    admin.updated = Date.now()
    admin.save((err) => {
        if (err) {
            return res.status(400).json({ error: 'You are not authorized to perform this action' })
        }
        admin.hashed_password = undefined;
        admin.salt = undefined;
        res.json({ admin })
    })
}
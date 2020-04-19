const Video = require('../models/video');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');



exports.videoById = (req, res, next, id) => {
    Video.findById(id).exec((err, video) => {
        if (err || !video) {
            return res.status(400).json({
                error: "Video not found"
            })
        }

        req.video = video; // Adds profile object in req with admin info
        next()
    })
}

exports.videoPhoto = (req, res, next) => {
    if (req.video.photo.data) {
        res.set("Content-Type", req.video.photo.contentType);
        return res.send(req.video.photo.data)
    }
    next()
}

exports.getVideo = (req, res) => {
    if (req.video) {
        return res.send(req.video)
    }
    next()
}



exports.getRecommendations = (req, res) => {
    res.json({
        posts: [
            { title: 'First Recommendation' },
            { title: 'Second Recommendation' },
            { title: 'Third Recommendation' }

        ]
    });
}

exports.getSearchedVideos = (req, res) => {
    const { title } = req.body;
    const start = parseInt(req.params.start);
    Video
        .find({ "title": { '$regex': title, '$options': 'i' } })
        .sort({ 'created': -1 })
        .skip(start)
        .limit(6)
        .exec(function (err, videos) {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.status(200).json(videos)
        })

}

exports.updateVideo = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Video not Updated'
            })
        }

        let video = req.video;

        video = _.extend(video, fields)
        video.updated = Date.now()

        if (files.photo) {
            video.photo.data = fs.readFileSync(files.photo.path);
            video.photo.contentType = files.photo.type;
        }

        video.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(video)
        })

    })

}


exports.createVideo = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
            next(err)
        }

        let video = new Video(fields);

        if (files.photo) {
            video.photo.data = fs.readFileSync(files.photo.path)
            video.photo.contentType = files.photo.type
        }

        video.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({ result })
        })

    })
}


exports.deleteVideo = (req, res) => {
    let video = req.video;
    video.remove((err, video) => {
        if (err) {
            res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'Video Deleted Successfully !'
        })
    })
}

exports.like = (req, res) => {
    Video.findByIdAndUpdate(req.body.videoId, { $push: { likes: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            else {
                res.json(result)
            }

        })
}

exports.unlike = (req, res) => {
    Video.findByIdAndUpdate(req.body.videoId, { $pull: { likes: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            else {
                res.json(result)
            }

        })
}
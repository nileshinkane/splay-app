const Video = require('../models/video');
const formidable = require('formidable');
const fs = require('fs');



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

exports.getVideos = (req, res) => {
    res.json({
        posts: [
            { title: 'First Video' },
            { title: 'Second Video' },
            { title: 'Third Video' }

        ]
    });
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
    // res.send(title)

    Video.find({ "title": { '$regex': title, '$options': 'i' } }, (err, videos) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        // res.send('egse')
        res.json(videos)
    })
}



exports.createVideo = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            // return res.status(400).json({
            //     error: 'Image could not be uploaded'
            // })
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
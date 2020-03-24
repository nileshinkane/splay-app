const Video = require('../models/video');
const formidable = require('formidable');
const fs = require('fs');



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

}
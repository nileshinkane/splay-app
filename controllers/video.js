const Video = require('../models/video');
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

exports.createVideo = (req, res) => {
    const video = new Video(req.body);
    // video.save((err, result) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: err
    //         })
    //     }

    //     res.status(200).json({
    //         video: result
    //     })
    // })

    video.save()
        .then(result => {
            res.status(200).json({
                video: result
            })
        })
}

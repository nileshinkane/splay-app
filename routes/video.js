const express = require('express');
const videoController = require('../controllers/video');
const testController = require('../controllers/testControllers');
const { requireSignin } = require('../controllers/auth');
const { adminById } = require('../controllers/admin');
const { videoById } = require('../controllers/video');
const validator = require('../validators');

const router = express.Router();

// router.get('/', videoController.getVideos);
router.get('/', videoController.getRecommendations);
router.get('/hello', testController.getTestOne);
router.post('/getSearchedVideos/:start', videoController.getSearchedVideos);
router.post('/submitVideo', videoController.createVideo);
router.delete('/video/:videoId', videoController.deleteVideo)

router.get('/video/photo/:videoId', videoController.videoPhoto)

router.delete('/video/delete/:videoId', videoController.deleteVideo)



//if any route contains adminId param, our app will run adminById method
router.param("videoId", videoById);

module.exports = router;


const express = require("express");
const videoController = require("../controllers/video");
const testController = require("../controllers/testControllers");
const { requireSignin } = require("../controllers/auth");
const { adminById } = require("../controllers/admin");
const {
  videoById,
  getFeaturedVideos,
  getVideosData,
} = require("../controllers/video");
const validator = require("../validators");

const router = express.Router();

// router.get('/', videoController.getVideos);

//LIKE UNLIKE
router.put("/video/like", requireSignin, videoController.like);
router.put("/video/unlike", requireSignin, videoController.unlike);

router.get("/", requireSignin, videoController.getRecommendations);
router.get("/getFeatured", getFeaturedVideos);
router.get("/getVideosData", getVideosData);
router.get("/hello", testController.getTestOne);
router.post("/getSearchedVideos/:start", videoController.getSearchedVideos);

router.post("/submitVideo", requireSignin, videoController.createVideo);

// router.delete('/video/:videoId', videoController.deleteVideo)
router.put("/video/:videoId", videoController.updateVideo);
router.get("/video/:videoId", videoController.getVideo);

router.get("/video/photo/:videoId", videoController.videoPhoto);

router.delete("/video/delete/:videoId", videoController.deleteVideo);

//if any route contains adminId param, our app will run adminById method
router.param("videoId", videoById);

module.exports = router;

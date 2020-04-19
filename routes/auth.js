const express = require('express');
const { signup, signin, signout, addBatch } = require('../controllers/auth');
const { adminById } = require('../controllers/admin');


// const validator = require('../validators');

const router = express.Router();

// router.get('/', videoController.getVideos);

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.post('/addBatch', addBatch)

//if any route contains adminId param, our app will run adminById method
router.param("adminId", adminById);


module.exports = router;


const express = require('express');
const testController = require('../controllers/testControllers');

const router = express.Router();


router.get('/hi', testController.getTestOne);





module.exports = router;

 
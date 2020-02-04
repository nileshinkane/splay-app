const express = require('express');
const { adminById, getAdmin, updateAdmin } = require('../controllers/admin');
const { requireSignin } = require('../controllers/auth');


const router = express.Router();

router.get('/admin/:adminId', requireSignin, getAdmin)
router.post('/adminUpdate/:adminId', requireSignin, updateAdmin)

//if any route contains adminId param, our app will run adminById method
router.param("adminId", adminById);


module.exports = router;


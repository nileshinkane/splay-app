const express = require("express");
const { userById, getUser } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.get("/user/:userId", getUser);

//if any route contains adminId param, our app will run adminById method
router.param("userId", userById);

module.exports = router;

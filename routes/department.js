const express = require("express");
const { getDepartment, setDepartment } = require("../controllers/department");

const router = express.Router();

router.post("/dept/add", setDepartment);
router.get("/dept/:deptName", getDepartment);

module.exports = router;

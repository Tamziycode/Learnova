const express = require("express");
const { enrollCourse, getMyCourses } = require("../controllers/Enrollmentcontroller");
const { get } = require("./Authroutes");

const router = express.Router();

router.post("/", enrollCourse);
router.get("/", getMyCourses);

module.exports = router;

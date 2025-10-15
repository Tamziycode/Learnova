//getAllCourses, getCourseById, createCourse
const express = require("express");

const{ getAllCourses, getCourseById, createCourse } = require("../controllers/Coursecontroller");

const router = express.Router();

router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

module.exports = router;
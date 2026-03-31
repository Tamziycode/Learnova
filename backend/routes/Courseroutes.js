const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  getInstructorCourses,
} = require("../controllers/Coursecontroller");
const { authorizeRole } = require("../middleware/role");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorizeRole("instructor"), createCourse);
router.get("/", protect, getAllCourses);
router.get(
  "/my-courses",
  protect,
  authorizeRole("instructor"),
  getInstructorCourses
);
router.get("/:id", protect, getCourseById);
router.delete("/:id", protect, authorizeRole("instructor"), deleteCourse);

module.exports = router;

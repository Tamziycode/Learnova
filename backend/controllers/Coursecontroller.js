const pool = require("../db.js");

// Create course (instructor only)
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      videourl,
      previewvideourl,
    } = req.body;
    const instructorId = req.user.id;

    const [result] = await pool.query(
      "INSERT INTO courses (title, description, category, previewVideoUrl, videourl, difficulty, instructor_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        description,
        category,
        previewvideourl,
        videourl,
        difficulty,
        instructorId,
      ]
    );

    res.status(201).json({ message: "Course created", id: result.insertId });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all courses (students/public)
const getAllCourses = async (req, res) => {
  try {
    const [courses] = await pool.query("SELECT * FROM courses");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single course
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const [course] = await pool.query("SELECT * FROM courses WHERE id = ?", [
      id,
    ]);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get only this instructor's courses
const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const [courses] = await pool.query(
      "SELECT * FROM courses WHERE instructor_id = ?",
      [instructorId]
    );
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete course — instructor must own it
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;

    const [course] = await pool.query(
      "SELECT * FROM courses WHERE id = ? AND instructor_id = ?",
      [id, instructorId]
    );

    if (course.length === 0) {
      return res
        .status(403)
        .json({ message: "Course not found or unauthorized." });
    }

    await pool.query("DELETE FROM courses WHERE id = ?", [id]);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  getInstructorCourses,
};

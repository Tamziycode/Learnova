// Example: Enrollment Controller Controls when a user enrolls for a course

const pool = require("../db")

// Enroll in a course
 const enrollCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    // check if already enrolled
    const existing = await pool.query(
      "SELECT * FROM user_courses WHERE userId = ? AND courseId = ?;",
      [ userId, courseId ]
    );
    if (existing) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const [enrollment] = await pool.query("SELECT * FROM user_courses WHERE userId = ? AND courseId = ?;",
      [ userId, courseId ] 
    ); 

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get my enrolled courses
 const getMyCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const [courses] = await pool.query("SELECT c.id AS courseId, c.title, c.description, c.category, c.difficulty, c.price FROM user_courses uc JOIN courses c ON uc.courseId = c.id WHERE uc.userId = ?;", 
      [userId]
    );
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { enrollCourse, getMyCourses };


//DELETE FROM user_courses WHERE userId = ? AND courseId = ?;  In event of leave course functionality

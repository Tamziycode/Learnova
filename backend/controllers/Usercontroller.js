//controls all the logic for users ie roles creation update and all of users
// Example: User Controller
const pool = require ("../db.js");

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming user is from JWT middleware
    const [user] = await pool.query(
      "SELECT * FROM users WHERE id = ? ",
      [userId]
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;

    const [updatedUser] = await pool.query(
      "UPDATE users SET username = ?, email = ? WHERE id = ?",
      [username, email, userId]
    );
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.export = { updateUserProfile, getUserProfile }
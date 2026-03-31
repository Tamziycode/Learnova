const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../db.js");
const { sendVerificationEmail } = require("../utils/sendEmail");

const signup = async (req, res) => {
  try {
    const { username, email, password, cPassword, gender, role } = req.body;

    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    if (password !== cPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const [results] = await pool.query(
      "INSERT INTO users (email, username, password, gender, role, is_verified, verification_token) VALUES (?, ?, ?, ?, ?, FALSE, ?)",
      [email, username, hashedPassword, gender, role, verificationToken]
    );

    // Send verification email
    try {
      await sendVerificationEmail(email, username, verificationToken);
    } catch (emailErr) {
      console.error("Email send failed:", emailErr.message);
      // Don't block signup if email fails — just log it
    }

    res.status(201).json({
      message:
        "Signup successful. Please check your email to verify your account.",
      user: { id: results.insertId, email, username, gender, role },
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existing[0].password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Block unverified users
    if (!existing[0].is_verified) {
      return res.status(403).json({
        message:
          "Please verify your email before signing in. Check your inbox.",
      });
    }

    const token = jwt.sign(
      {
        id: existing[0].id,
        email: existing[0].email,
        role: existing[0].role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Signin successful",
      user: {
        id: existing[0].id,
        email: existing[0].email,
        username: existing[0].username,
        gender: existing[0].gender,
        role: existing[0].role,
      },
      token,
    });
  } catch (error) {
    console.error("Error in signin controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Verification token missing." });
    }

    const [users] = await pool.query(
      "SELECT * FROM users WHERE verification_token = ?",
      [token]
    );

    if (users.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification link." });
    }

    await pool.query(
      "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?",
      [users[0].id]
    );

    // Redirect to frontend signin page with success message
    res.redirect(`${process.env.CLIENT_URL}/Signin?verified=true`);
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No account found with that email." });
    }

    if (users[0].is_verified) {
      return res
        .status(400)
        .json({ message: "This account is already verified." });
    }

    const newToken = crypto.randomBytes(32).toString("hex");

    await pool.query(
      "UPDATE users SET verification_token = ? WHERE email = ?",
      [newToken, email]
    );

    await sendVerificationEmail(email, users[0].username, newToken);

    res.json({ message: "Verification email resent. Check your inbox." });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signin, signup, verifyEmail, resendVerification };

const express = require("express");
const {
  signup,
  signin,
  verifyEmail,
  resendVerification,
} = require("../controllers/Authcontroller");
const { validateSignup, validateSignin } = require("../middleware/validate");

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);

module.exports = router;

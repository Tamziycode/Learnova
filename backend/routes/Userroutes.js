const express = require("express");

const{ updateUserProfile, getUserProfile } = require("../controllers/Usercontroller");
const { get } = require("./Authroutes");

const router = express.Router();

router.post("/", updateUserProfile);
router.get("/:id",getUserProfile);

module.exports = router;
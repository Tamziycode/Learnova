const express = require("express");
const { signup } = require("../controllers/Authcontroller");
const { signin } = require("../controllers/Authcontroller");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
module.exports = router;

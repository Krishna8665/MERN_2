const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");
const router = express.Router();

//routes here

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;

const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const permitTo = require("../middleware/permitTo");
const { getUsers } = require("../controller/admin/user/userController");

const router = express.Router();

//routes here

router.route("/users").get(isAuthenticated, permitTo("admin"), getUsers);

module.exports = router;

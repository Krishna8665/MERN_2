const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const permitTo = require("../middleware/permitTo");
const {
  getUsers,
  deleteUser,
} = require("../controller/admin/user/userController");

const router = express.Router();

//routes here

router.route("/users").get(isAuthenticated, permitTo("admin"), getUsers);
router.route("/users/:id").get(isAuthenticated, permitTo("admin"), deleteUser);

module.exports = router;

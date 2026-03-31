const {
  getMyProfile,
} = require("../controller/user/profile/profileController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/profile").get(isAuthenticated, catchAsync(getMyProfile));
module.exports = router;

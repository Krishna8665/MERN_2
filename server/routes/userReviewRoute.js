const { getMyReviews } = require("../controller/user/review/reviewController");
const {
  getProductReview,
  createReview,
  deleteReview,
} = require("../controller/user/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const permitTo = require("../middleware/permitTo");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();
router.route("/reviews").get(isAuthenticated, catchAsync(getMyReviews));
router
  .route("/reviews/:id")
  .get(catchAsync(getProductReview))
  .delete(isAuthenticated,catchAsync(deleteReview))
  .post(isAuthenticated, catchAsync(createReview));
module.exports = router;

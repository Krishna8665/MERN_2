const {
  addTocart,
  getMyCartItems,
  deleteItemFromCart,
} = require("../controller/user/cart/cartController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/cart/:productId")
  .post(isAuthenticated, catchAsync(addTocart))
  .delete(isAuthenticated, catchAsync(deleteItemFromCart));
router.route("/cart").get(isAuthenticated, catchAsync(getMyCartItems));

module.exports = router;

const express = require("express");
const {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  editProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const permitTo = require("../middleware/permitTo");
const upload = require("../middleware/multerConfig");
const catchAsync = require("../services/catchAsync");
const router = express.Router();

router
  .route("/product")
  .post(
    isAuthenticated,
    permitTo("admin"),
    upload.single("productImage"),
    createProduct
  )
  .get(getProducts);
router
  .route("/product/:id")
  .get(catchAsync(getProduct))
  .delete(isAuthenticated, permitTo("admin"), catchAsync(deleteProduct))
  .patch(
    isAuthenticated,
    permitTo("admin"),
    upload.single("productImage"),
    editProduct
  );

module.exports = router;

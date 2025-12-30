const express = require("express");
const {
  createProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const permitTo = require("../middleware/permitTo");
const upload = require("../middleware/multerConfig");
const router = express.Router();

router
  .route("/product")
  .post(
    isAuthenticated,
    permitTo("admin"),
    upload.single("productImage"),
    createProduct
  );

module.exports = router;

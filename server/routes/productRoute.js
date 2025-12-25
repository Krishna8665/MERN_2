const express = require("express");
const { createProduct } = require("../controller/auth/productController");

const router = express.Router();

router.route("/product").post(createProduct);

module.exports = router;

const express = require("express");
const { createProduct } = require("../controller/auth/productController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/product").post(isAuthenticated, createProduct);

module.exports = router;

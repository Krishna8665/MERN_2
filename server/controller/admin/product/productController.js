const Product = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
  try {
    const file = req.file;
    let filePath;

    // Handle image
    if (!file) {
      filePath =
        "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=";
    } else {
      filePath = req.file.path;
    }

    const {
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQty,
    } = req.body;

    // Validation
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productStatus ||
      !productStockQty
    ) {
      return res.status(400).json({
        message: "Please provide all the fields",
      });
    }

    // Save to DB
    await Product.create({
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQty,
      productImage: filePath,
    });

    res.status(201).json({
      message: "Product Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

const Product = require("../../../model/productModel");
const catchAsync = require("../../../services/catchAsync");

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

exports.getProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  if (products.lenght === 0) {
    res.status(400).json({
      message: "No product Found",
      products: [],
    });
  } else {
    res.status(200).json({
      message: "Product fetched successfully",
      products,
    });
  }
});

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide product id",
    });
  }
  const product = await Product.find({ _id: id });
  if (product.length == 0) {
    res.status(400).json({
      message: "No product found with that id",
      product: [],
    });
  } else {
    res.status(200).json({
      message: "Product Fetched Successfully",
      product,
    });
  }
};

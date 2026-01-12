const Product = require("../../../model/productModel");
const Review = require("../../../model/reviewModel");
const catchAsync = require("../../../services/catchAsync");
const fs = require("fs");

exports.createProduct = async (req, res) => {
  try {
    const file = req.file;
    let filePath;

    // Handle image
    if (!file) {
      filePath =
        "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=";
    } else {
      filePath = req.file.path.replace(/\\/g, "/").split("/").pop();
    }

    const {
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQty,
      mainType,
    } = req.body;

    // Validation
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productStatus ||
      !productStockQty ||
      !mainType
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
      mainType,
      productImage: file ? `${process.env.BACKEND_URL}/${filePath}` : filePath,
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
  if (products.length === 0) {
    res.status(400).json({
      message: "No product Found",
      data: [],
    });
  } else {
    res.status(200).json({
      message: "Product fetched successfully",
      data: products,
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
  const productReviews = await Review.find({ productId: id })
    .populate("userId")
    .populate("productId");

  if (product.length == 0) {
    res.status(400).json({
      message: "No product found with that id",
      data: {
        data: [],
        data2: [],
      },
    });
  } else {
    res.status(200).json({
      message: "Product Fetched Successfully",
      data: { product, productReviews },
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide product id",
    });
  }
  const oldData = await Product.findById(id);
  if (!oldData) {
    res.status(404).json({
      message: "No data found with that id",
    });
  }
  const oldProductImage = oldData.productImage; //
  const lenghtTocut = process.env.BACKEND_URL.length;
  const finalFilePathAfterCut = oldProductImage.slice(lenghtTocut); //1111111-abcd.png
  if (req.file && req.file.filename) {
    //Remove File from uploads folder
    fs.unlink("./uploads/" + finalFilePathAfterCut, (err) => {
      if (err) {
        console.log("error deleting file", err);
      } else {
        console.log("file deleted successfully");
      }
    });
  }
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    message: "Product Deleted Successfully",
  });
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
    mainType,
  } = req.body;

  // Validation
  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStatus ||
    !productStockQty ||
    !mainType ||
    !id
  ) {
    return res.status(400).json({
      message: "Please provide all the fields",
    });
  }

  const oldData = await Product.findById(id);
  if (!oldData) {
    res.status(404).json({
      message: "No data found with that id",
    });
  }
  const oldProductImage = oldData.productImage; //
  const lenghtTocut = process.env.BACKEND_URL.length;
  const finalFilePathAfterCut = oldProductImage.slice(lenghtTocut); //1111111-abcd.png
  if (req.file && req.file.filename) {
    //Remove File from uploads folder
    fs.unlink("./uploads/" + finalFilePathAfterCut, (err) => {
      if (err) {
        console.log("error deleting file", err);
      } else {
        console.log("file deleted successfully");
      }
    });
  }

  const datas = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQty,
      mainType,
      productImage:
        req.file && req.file.filename
          ? `${process.env.BACKEND_URL}/${req.file.filename}`
          : oldProductImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    message: "Product creted successfuly",
    data: datas,
  });
};

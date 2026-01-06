const Product = require("../../../model/productModel");
const Review = require("../../../model/reviewModel");

exports.createReview = async (req, res) => {
  const userId = req.user.id;
  const { rating, message } = req.body;
  const productId = req.params.id;
  if (!rating || !message || !productId) {
    return res.status(400).json({
      message: "Please provide rating,message,productId",
    });
  }
  //check if that productID product exists or
  const productExist = await Product.findById(productId);
  if (!productExist) {
    return res.status(404).json({
      message: "product with that productId doesnt Exist",
    });
  }
  //insert them into Review
  await Review.create({
    userId,
    productId,
    rating,
    message,
  });
  res.status(200).json({
    message: "Review added successfully",
  });
};

exports.getProductReview = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({
      message: "Please provide productID",
    });
  }
  const productExist = await Product.findById(productId);
  if (!productExist) {
    return res.status(404).json({
      message: "product with that productId doesnt Exist",
    });
  }

  const reviews = await Review.find({ productId })
    .populate("userId")
    .populate("productId");
  res.status(200).json({
    message: "review fetched successfully",
    data: reviews,
  });
};

exports.getMyReviews = async (req, res) => {
  const userId = req.user.id;
  const reviews = await Review.find({ userId });
  if (reviews.length == 0) {
    res.status(404).json({
      message: "You havenot given review to any products yet",
      reviews: [],
    });
  } else {
    res.status(200).json({
      message: "review fetched successfully",
      data: reviews,
    });
  }
};

exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  //check if that User created this review
  const userId = req.user.id;
  const review = await Review.findById(reviewId);
  if (!reviewId) {
    res.status(400).json({
      message: "Please provide reviewId",
    });
  }
  if (review.userId.toString() !== userId) {
    return res.status(403).json({
      message: "You dont have permission to delete this review",
    });
  }

  await Review.findByIdAndDelete(reviewId);
  res.status(200).json({
    message: "Review delete successfully",
  });
};

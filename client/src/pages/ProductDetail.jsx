// src/pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  MessageSquare,
  ChevronDown,
  Loader2,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/cartContext";

const API_BASE = "http://localhost:3000"; // Change to your backend URL in production

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product + reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch product
        const productRes = await axios.get(`${API_BASE}/product/${id}`);
        const fetched = productRes.data.data?.product?.[0];
        if (!fetched) throw new Error("Product not found");
        setProduct(fetched);

        // Fetch reviews
        const reviewsRes = await axios.get(`${API_BASE}/reviews/${id}`);
        setReviews(reviewsRes.data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load product/reviews"
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Quantity handler
  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1 && newQty <= (product?.productStockQty || 10)) {
      setQuantity(newQty);
    }
  };

  // Add to Cart with login redirect
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate(`/login?redirect=/product/${id}`);
      return;
    }

    if (product?.productStatus !== "available") {
      alert("Product is not available");
      return;
    }

    if (product?.productStockQty < quantity) {
      alert("Not enough stock available");
      return;
    }

    try {
      await addToCart(product, quantity);
      alert(`Added ${quantity} × ${product.productName} to cart!`);
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  // Submit review
  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/product/${id}`);
      return;
    }

    if (newReview.rating === 0 || !newReview.comment.trim()) {
      alert("Please provide rating and comment");
      return;
    }

    setReviewLoading(true);

    try {
      await axios.post(
        `${API_BASE}/reviews/${id}`,
        { rating: newReview.rating, message: newReview.comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const res = await axios.get(`${API_BASE}/reviews/${id}`);
      setReviews(res.data.data || []);

      setNewReview({ rating: 0, comment: "" });
      alert("Review submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    } finally {
      setReviewLoading(false);
    }
  };

  // Delete own review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await axios.delete(`${API_BASE}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const res = await axios.get(`${API_BASE}/reviews/${id}`);
      setReviews(res.data.data || []);

      alert("Review deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete review");
    }
  };

  const handleStarClick = (star) =>
    setNewReview({ ...newReview, rating: star });

  const displayedReviews = reviews.slice(0, visibleReviews);
  const hasMore = visibleReviews < reviews.length;

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1
      )
    : "0.0";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error || "Product not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden mx-auto lg:mx-0 max-w-[500px] w-full"
          >
            <div className="aspect-square p-6 sm:p-8">
              <img
                src={
                  product.productImage ||
                  "https://via.placeholder.com/600?text=No+Image"
                }
                alt={product.productName}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5 sm:space-y-6"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.mainType !== "Veg" && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm">
                  Non-Veg
                </span>
              )}
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm">
                {product.mainType}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">
                {product.productStatus === "available"
                  ? "Available"
                  : "Unavailable"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {product.productName}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < avgRating
                        ? "text-orange-500 fill-orange-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {avgRating} • {reviews.length} reviews
              </span>
            </div>

            {/* Price & Stock */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-orange-600">
                NPR {product.productPrice}
              </span>
              <span className="text-sm sm:text-base text-gray-600 font-medium">
                {product.productStockQty > 0
                  ? `(${product.productStockQty} available)`
                  : "(Out of stock)"}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {product.productDescription}
            </p>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="inline-flex items-center border border-gray-300 rounded-full bg-white overflow-hidden w-full sm:w-auto">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-5 py-3 hover:bg-gray-100 transition"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-8 py-3 text-lg font-medium min-w-[4rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-5 py-3 hover:bg-gray-100 transition"
                  disabled={quantity >= product.productStockQty}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={
                  product?.productStatus !== "available" ||
                  product?.productStockQty <= 0
                }
                className={`flex-1 py-3 px-6 rounded-full transition flex items-center justify-center gap-2 font-medium text-white
                  ${
                    product?.productStatus !== "available" ||
                    product?.productStockQty <= 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`}
              >
                <ShoppingCart size={18} />
                Add to Cart {quantity > 1 ? `(${quantity})` : ""}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 lg:mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <MessageSquare className="text-orange-600" size={24} />
            Customer Reviews ({reviews.length})
          </h2>

          {isAuthenticated ? (
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm mb-10">
              <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setNewReview((prev) => ({ ...prev, rating: star }))
                    }
                  >
                    <Star
                      size={28}
                      className={`${
                        star <= newReview.rating
                          ? "text-orange-500 fill-orange-500"
                          : "text-gray-300"
                      } hover:text-orange-400 transition`}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                placeholder="Share your experience..."
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[90px] text-sm sm:text-base"
              />
              <button
                onClick={handleSubmitReview}
                disabled={reviewLoading}
                className={`mt-4 px-6 py-2.5 sm:py-3 rounded-full text-white font-medium transition
                  ${
                    reviewLoading
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`}
              >
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          ) : (
            <div className="bg-orange-50 p-6 rounded-xl text-center mb-10">
              <p className="text-orange-800 mb-2">
                Please log in to write a review.
              </p>
              <Link
                to={`/login?redirect=/product/${id}`}
                className="text-orange-600 hover:underline font-medium"
              >
                Login now
              </Link>
            </div>
          )}

          <div className="space-y-5 sm:space-y-6">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-600 py-8">
                No reviews yet. Be the first!
              </p>
            ) : (
              displayedReviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-5 sm:p-6 rounded-xl shadow-sm relative"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {review.userId?.userName || "Anonymous"}
                      </h4>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "text-orange-500 fill-orange-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                      {user && review.userId?._id === user.id && (
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Delete your review"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {review.message}
                  </p>
                </div>
              ))
            )}
          </div>

          {reviews.length > 4 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  if (hasMore) {
                    setVisibleReviews((prev) =>
                      Math.min(prev + 5, reviews.length)
                    );
                  } else {
                    setVisibleReviews(4);
                  }
                }}
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
              >
                {hasMore ? (
                  <>
                    Show More Reviews <ChevronDown size={18} />
                  </>
                ) : (
                  <>
                    Show Fewer Reviews{" "}
                    <ChevronDown size={18} className="rotate-180" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

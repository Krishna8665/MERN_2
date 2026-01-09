// src/pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [loading, setLoading] = useState(true);

  // Mock data (replace with real API)
  useEffect(() => {
    setTimeout(() => {
      const mockProduct = {
        id,
        name: "Classic Chicken Steamed Momo",
        price: 320,
        description:
          "Juicy minced chicken seasoned with authentic Nepali spices, wrapped in thin dough and steamed to perfection. Served with spicy tomato achar.",
        ingredients:
          "Chicken, onion, garlic, ginger, coriander, cumin, green chili, wheat flour",
        stock: 45,
        rating: 4.8,
        reviewCount: 124,
        image:
          "https://images.unsplash.com/photo-1626700055272-8e4c0e9b7a5e?w=800",
        isVeg: false,
        type: "Chicken",
        momoType: "Steamed",
      };

      const mockReviews = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        userName: `User ${i + 1}`,
        rating: Math.floor(Math.random() * 2) + 4,
        comment: [
          "Very juicy",
          "Perfect spices",
          "Fast delivery",
          "Worth every penny",
          "Will order again",
        ][Math.floor(Math.random() * 5)],
        date: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(
          2,
          "0"
        )}-0${Math.floor(Math.random() * 28) + 1}`,
      }));

      setProduct(mockProduct);
      setReviews(mockReviews);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1 && newQty <= (product?.stock || 10)) {
      setQuantity(newQty);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment.trim())
      return alert("Please provide rating and comment");

    const review = {
      id: reviews.length + 1,
      userName: "You",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 0, comment: "" });
  };

  const handleStarClick = (star) =>
    setNewReview({ ...newReview, rating: star });

  const displayedReviews = reviews.slice(0, visibleReviews);
  const hasMore = visibleReviews < reviews.length;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12">
        {/* Main Content - Image + Info (clean top spacing) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image - compact & responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden mx-auto lg:mx-0 max-w-[500px] w-full"
          >
            <div className="aspect-square p-6 sm:p-8">
              <img
                src={product.image}
                alt={product.name}
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
              {!product.isVeg && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm">
                  Non-Veg
                </span>
              )}
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm">
                {product.type}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">
                {product.momoType}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-orange-500 fill-orange-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} • {product.reviewCount} reviews
              </span>
            </div>

            {/* Price & Stock */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-orange-600">
                NPR {product.price}
              </span>
              <span className="text-sm sm:text-base text-gray-600 font-medium">
                {product.stock > 0
                  ? `(${product.stock} available)`
                  : "(Out of stock)"}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {/* Quantity + Add to Cart - responsive stacking */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="inline-flex items-center border border-gray-300 rounded-full bg-white overflow-hidden w-full sm:w-auto">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-5 py-3 hover:bg-gray-100 transition"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-8 py-3 text-lg font-medium min-w-[4rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-5 py-3 hover:bg-gray-100 transition"
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-full hover:bg-orange-700 transition flex items-center justify-center gap-2 font-medium">
                <ShoppingCart size={18} />
                Add to Cart
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

          {/* Review Form */}
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm mb-10">
            <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>

            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
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
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="Share your experience..."
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[90px] text-sm sm:text-base"
            />

            <button
              onClick={handleReviewSubmit}
              className="mt-4 bg-orange-600 text-white px-6 py-2.5 sm:py-3 rounded-full hover:bg-orange-700 transition font-medium text-sm sm:text-base"
            >
              Submit Review
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-5 sm:space-y-6">
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-5 sm:p-6 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {review.userName}
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
                  <span className="text-xs sm:text-sm text-gray-500">
                    {review.date}
                  </span>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Load More */}
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

// src/components/ProductGrid.jsx (updated ProductCard)
import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ← Add this
import { ShoppingCart, Eye } from "lucide-react";

const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  showActions = true,
  disableAnimations = false,
}) {
  const navigate = useNavigate(); // ← Hook for navigation
  const [imageLoaded, setImageLoaded] = useState(false);

  const variants = disableAnimations
    ? {}
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: "easeOut" },
        },
      };

  // Navigate to single product page when card is clicked (except on buttons)
  const handleCardClick = (e) => {
    // Prevent navigation if user clicks on Add to Cart or Quick View buttons
    if (e.target.closest("button")) return;
    navigate(`/product/${product._id}`); // ← Use _id from MongoDB
  };

  return (
    <motion.div
      variants={variants}
      initial={disableAnimations ? false : "hidden"}
      animate={disableAnimations ? false : "visible"}
      className="group cursor-pointer" // ← Make whole card clickable
      onClick={handleCardClick} // ← Click anywhere on card → navigate
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-md">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        <img
          src={
            product.productImage ||
            "https://via.placeholder.com/400?text=No+Image"
          }
          alt={product.productName}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hover Actions - still clickable without navigating */}
        {showActions && (
          <div className="absolute inset-0 flex items-end justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex gap-3 pb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // ← Prevent card navigation
                  onAddToCart?.(product);
                }}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-orange-50"
              >
                <ShoppingCart size={16} />
                Add
              </button>
              {onQuickView && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ← Prevent card navigation
                    onQuickView?.(product);
                  }}
                  className="flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/30"
                >
                  <Eye size={16} />
                  View
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 text-center">
        <h3 className="line-clamp-2 text-base font-medium text-gray-900 group-hover:text-orange-600">
          {product.productName}
        </h3>

        <p className="mt-1 text-lg font-semibold text-orange-600">
          NPR {product.productPrice}
        </p>

        {/* Optional: Category badge */}
        <span className="mt-2 inline-block px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
          {product.mainType}
        </span>
      </div>
    </motion.div>
  );
});

/* =======================
   Product Grid
======================= */
export default function ProductGrid({
  products = [],
  onAddToCart,
  onQuickView,
  showActions = true,
  disableAnimations = false,
  emptyMessage = "No products found",
  limit = 24,
}) {
  if (!products.length) {
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-6
        md:gap-8
      "
    >
      {products.slice(0, limit).map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
          showActions={showActions}
          disableAnimations={disableAnimations}
        />
      ))}
    </div>
  );
}

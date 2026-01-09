import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";

/* =======================
   Product Card
======================= */

const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  showActions = true,
  disableAnimations = false,
}) {
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

  return (
    <motion.div
      variants={variants}
      initial={disableAnimations ? false : "hidden"}
      animate={disableAnimations ? false : "visible"}
      className="group"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-md">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hover Actions */}
        {showActions && (
          <div className="absolute inset-0 flex items-end justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex gap-3 pb-4">
              <button
                onClick={() => onAddToCart?.(product)}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-orange-50"
              >
                <ShoppingCart size={16} />
                Add
              </button>

              {onQuickView && (
                <button
                  onClick={() => onQuickView(product)}
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
          {product.name}
        </h3>

        {product.rating && (
          <div className="mt-1 flex justify-center items-center gap-1 text-sm">
            <span className="text-orange-400">
              {"★".repeat(Math.round(product.rating))}
            </span>
            <span className="text-gray-400">({product.rating})</span>
          </div>
        )}

        <p className="mt-1 text-lg font-semibold text-orange-600">
          NPR {product.price}
        </p>
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
        gap-6
        md:gap-8
      "
    >
      {products.slice(0, limit).map((product) => (
        <ProductCard
          key={product.id}
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

// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import axios from "axios";

// API base URL (put this in .env in real project)
const API_BASE = "http://localhost:3000";

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products using Axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE}/product`);
        const fetchedProducts = response.data.data || [];
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
        console.error("Axios error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Featured Momos: Take first 4 products
  const featuredProducts = products.slice(0, 4);

  // Categories: Unique mainType + first image of each type
  const categories = [...new Set(products.map((p) => p.mainType))].map(
    (type) => ({
      name: type,
      image:
        products.find((p) => p.mainType === type)?.productImage ||
        "https://via.placeholder.com/400?text=" + type,
    })
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] sm:min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb"
          alt="Luxury handmade jewelry"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-900/50 to-transparent z-10" />
        <div className="relative z-20 container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-white tracking-wide leading-tight mb-5 sm:mb-8">
              Timeless Flavour,
              <br />
              <span className="text-amber-400 font-normal">
                Crafted by Hand
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-10 max-w-xl">
              Handcrafted momos with authentic flavors from the Himalayas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                to="/shop"
                className="inline-block px-8 py-3 sm:px-10 sm:py-4 bg-amber-500 text-white rounded-full text-base sm:text-lg font-medium hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/30"
              >
                Shop Collection
              </Link>
              <Link
                to="/shop"
                className="inline-block px-8 py-3 sm:px-10 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                New Arrivals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Momos */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-4">
              Featured Momos
            </h2>
            <div className="h-1 bg-amber-400 mx-auto rounded-full " />
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-lg mb-2 line-clamp-1">
                      {product.productName}
                    </h3>
                    <p className="text-orange-600 font-bold mb-3">
                      NPR {product.productPrice}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No featured momos available
            </p>
          )}
        </div>
      </section>

      {/* Explore by Category */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-4">
              Explore by Category
            </h2>
            <div className="h-1 bg-amber-400 mx-auto rounded-full " />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-md cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end justify-center pb-6 sm:pb-10">
                  <h3 className="text-white text-lg sm:text-2xl md:text-3xl font-playfair font-light">
                    {category.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-amber-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-6">
            Ready to Taste the Difference?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-8 sm:mb-10">
            Handcrafted momos with love and authentic flavors
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-5 bg-amber-600 text-white rounded-full text-lg sm:text-xl font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-500/30"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </div>
  );
}

// src/pages/Shop.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Loader2, Star, Trash2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Assuming you have AuthContext
import ProductGrid from "../components/ProductGrid";

// API base (move to .env: import.meta.env.VITE_API_BASE)
const API_BASE = "http://localhost:3000";

export default function Shop() {
  const { user } = useAuth(); // Get logged-in user
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productReviews, setProductReviews] = useState({}); // { productId: [reviews] }
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") || "all"
  );
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/product`);
        const data = res.data.data || [];
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch reviews for each visible product
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewPromises = filteredProducts.map(async (product) => {
        try {
          const res = await axios.get(`${API_BASE}/reviews/${product._id}`);
          return { productId: product._id, reviews: res.data.data || [] };
        } catch (err) {
          console.error(`Failed to load reviews for ${product._id}`);
          return { productId: product._id, reviews: [] };
        }
      });

      const results = await Promise.all(reviewPromises);
      const reviewsMap = results.reduce((acc, { productId, reviews }) => {
        acc[productId] = reviews;
        return acc;
      }, {});

      setProductReviews(reviewsMap);
    };

    if (filteredProducts.length > 0) {
      fetchReviews();
    }
  }, [filteredProducts]);

  // Filters & Sorting
  useEffect(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType !== "all") {
      result = result.filter((p) => p.mainType === selectedType);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.productPrice - a.productPrice);
        break;
      default:
        result.sort((a, b) => b.productStockQty - a.productStockQty);
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedType, sortBy]);

  // Unique categories
  const categories = ["all", ...new Set(products.map((p) => p.mainType))];

  // Submit new review
  const handleSubmitReview = async (productId, rating, comment) => {
    if (!user) return alert("Please login to submit a review");

    try {
      await axios.post(
        `${API_BASE}/reviews/${productId}`,
        { rating, message: comment },
        {
          headers: { Authorization: `Bearer ${user.token}` }, // Assuming token in user context
        }
      );

      // Refresh reviews
      const res = await axios.get(`${API_BASE}/reviews/${productId}`);
      setProductReviews((prev) => ({
        ...prev,
        [productId]: res.data.data || [],
      }));

      alert("Review submitted!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    }
  };

  // Delete own review
  const handleDeleteReview = async (productId, reviewId) => {
    if (!user) return alert("Please login");

    if (!window.confirm("Delete this review?")) return;

    try {
      await axios.delete(`${API_BASE}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // Refresh reviews
      const res = await axios.get(`${API_BASE}/reviews/${productId}`);
      setProductReviews((prev) => ({
        ...prev,
        [productId]: res.data.data || [],
      }));

      alert("Review deleted!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900">
              All Momos
            </h1>
            <p className="text-gray-600 mt-1">
              {loading
                ? "Loading..."
                : `${filteredProducts.length} items available`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search momos..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setSearchParams(type === "all" ? {} : { type });
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all
                ${
                  selectedType === type
                    ? "bg-orange-600 text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {type === "all" ? "All Types" : type}
            </button>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-600">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-lg text-gray-600 mb-4">No momos found</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("all");
                setSearchParams({});
              }}
              className="text-orange-600 hover:underline font-medium"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={(p) => console.log("Add to cart:", p)} // Replace with real
            onQuickView={(p) => console.log("Quick view:", p)}
            showActions={true}
          />
        )}

        {/* Reviews Section (optional per product - shown below grid if you want) */}
        {/* You can loop through filteredProducts and show reviews per product */}
      </div>
    </div>
  );
}

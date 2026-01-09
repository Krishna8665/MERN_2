// src/pages/Shop.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import ProductGrid from "../components/ProductGrid";

/* ------------------ Mock Data ------------------ */

const mockMomos = [
  {
    id: 1,
    name: "Classic Chicken Momo",
    price: 320,
    flavor: "classic",
    image:
      "https://images.unsplash.com/photo-1626700055272-8e4c0e9b7a5e?w=400&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Fiery Chili Chicken",
    price: 350,
    flavor: "spicy",
    image:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Veg Special Momo",
    price: 280,
    flavor: "veggie",
    image:
      "https://images.unsplash.com/photo-1626645738538-2c4f7e0b0e2d?w=400&auto=format&fit=crop",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Cheesy Blast Momo",
    price: 380,
    flavor: "cheese",
    image:
      "https://images.unsplash.com/photo-1626645738538-2c4f7e0b0e2d?w=400&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Pork Momo Deluxe",
    price: 340,
    flavor: "pork",
    image:
      "https://images.unsplash.com/photo-1626700055272-8e4c0e9b7a5e?w=400&auto=format&fit=crop",
    rating: 4.5,
  },
];

/* ------------------ Filters ------------------ */

const FLAVORS = ["all", "classic", "spicy", "veggie", "cheese", "pork"];

/* ------------------ Shop Page ------------------ */

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState(mockMomos);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState(
    searchParams.get("flavor") || "all"
  );
  const [sortBy, setSortBy] = useState("popular");

  /* ------------------ Filter + Sort Logic ------------------ */

  useEffect(() => {
    let filtered = [...mockMomos];

    // Search
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category / Flavor
    if (selectedFlavor !== "all") {
      filtered = filtered.filter(
        (p) => p.flavor === selectedFlavor
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => b.rating - a.rating);
    }

    setProducts(filtered);
  }, [searchQuery, selectedFlavor, sortBy]);

  /* ------------------ UI ------------------ */

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-gray-900">
              All Momos
            </h1>
            <p className="text-gray-600">
              {products.length} delicious choices
            </p>
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search momos..."
                className="w-full rounded-full border px-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border px-4 py-2 bg-white"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Flavor / Category Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {FLAVORS.map((flavor) => (
            <button
              key={flavor}
              onClick={() => {
                setSelectedFlavor(flavor);
                setSearchParams(
                  flavor === "all" ? {} : { flavor }
                );
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all
                ${
                  selectedFlavor === flavor
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {flavor === "all"
                ? "All Flavors"
                : flavor.charAt(0).toUpperCase() + flavor.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid (REUSED COMPONENT) */}
        <ProductGrid
          products={products}
          onAddToCart={(p) => console.log("Add to cart:", p)}
          onQuickView={(p) => console.log("Quick view:", p)}
          disableAnimations
        />
      </div>
    </div>
  );
}

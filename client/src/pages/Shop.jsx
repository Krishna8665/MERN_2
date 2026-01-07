// src/pages/Shop.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

// Mock data (later replace with API call)
const mockMomos = [
  { id: 1, name: "Classic Chicken Momo", price: 320, flavor: "classic", image: "https://images.unsplash.com/photo-1626700055272-8e4c0e9b7a5e?w=800", isVeg: false, rating: 4.8 },
  { id: 2, name: "Fiery Chili Chicken", price: 350, flavor: "spicy", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800", isVeg: false, rating: 4.7 },
  { id: 3, name: "Veg Special Momo", price: 280, flavor: "veggie", image: "https://images.unsplash.com/photo-1626645738538-2c4f7e0b0e2d?w=800", isVeg: true, rating: 4.6 },
  { id: 4, name: "Cheesy Blast Momo", price: 380, flavor: "cheese", image: "https://images.unsplash.com/photo-1626645738538-2c4f7e0b0e2d?w=800", isVeg: true, rating: 4.9 },
  { id: 5, name: "Pork Momo Deluxe", price: 340, flavor: "pork", image: "https://images.unsplash.com/photo-1626700055272-8e4c0e9b7a5e?w=800", isVeg: false, rating: 4.5 },
  // ... add more items
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(mockMomos);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState(searchParams.get('flavor') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  // Filter & sort logic
  useEffect(() => {
    let filtered = [...mockMomos];

    // Search
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Flavor filter
    if (selectedFlavor !== 'all') {
      filtered = filtered.filter(p => p.flavor === selectedFlavor);
    }

    // Sorting
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // popular = rating + newest
        filtered.sort((a, b) => b.rating - a.rating);
    }

    setProducts(filtered);
  }, [searchQuery, selectedFlavor, sortBy]);

  const flavors = ['all', 'classic', 'spicy', 'veggie', 'cheese', 'pork'];

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header + Search + Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900">
              All Momos
            </h1>
            <p className="text-gray-600 mt-2">
              {products.length} delicious choices
            </p>
          </div>

          {/* Search & Sort */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Search momos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Flavor Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {flavors.map(flavor => (
            <button
              key={flavor}
              onClick={() => {
                setSelectedFlavor(flavor);
                setSearchParams(flavor === 'all' ? {} : { flavor });
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all
                ${selectedFlavor === flavor 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              {flavor === 'all' ? 'All Flavors' : flavor.charAt(0).toUpperCase() + flavor.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium text-gray-700 mb-4">
              No momos found
            </h3>
            <p className="text-gray-500">
              Try changing filters or search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.isVeg && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      VEG
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-medium text-lg mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? "text-orange-400" : "text-gray-300"}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.rating})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">
                      NPR {product.price}
                    </span>
                    <button className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
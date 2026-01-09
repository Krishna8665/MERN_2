import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import ProductGrid from "../components/ProductGrid";

// You can later move this to a separate data file or fetch from API
const featuredProducts = [
  {
    id: 1,
    name: "Moonlight Pearl Necklace",
    price: 189,
    image: "https://images.unsplash.com/photo-1611590027211-b954fd027b51",
    category: "Necklace",
  },
  {
    id: 2,
    name: "Sapphire Drop Earrings",
    price: 245,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5f92112",
    category: "Earrings",
  },
  {
    id: 3,
    name: "Vintage Rose Gold Ring",
    price: 320,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    category: "Ring",
  },
  {
    id: 4,
    name: "Emerald & Diamond Bracelet",
    price: 480,
    image: "https://images.unsplash.com/photo-1611590028471-f8dd1a7d6c3d",
    category: "Bracelet",
  },
];

const categories = [
  {
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1611590027211-b954fd027b51",
  },
  {
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
  },
  {
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5f92112",
  },
  {
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611590028471-f8dd1a7d6c3d",
  },
];

export default function Home() {
  const { addToCart } = useCart();

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
              {/* Add your tagline here */}
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

      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-4">
              Featured MoMos
            </h2>

            <div className=" h-1 bg-amber-400 mx-auto rounded-full" />
          </div>

          {/*  REUSED PRODUCT GRID */}
          <ProductGrid
            products={featuredProducts}
            onAddToCart={(p) => console.log("Add to cart:", p)}
            onQuickView={(p) => console.log("Quick view:", p)}
            disableAnimations={false} // keep light animations on home
            limit={8} // show limited items on home
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-4">
              Explore by Category
            </h2>
            <div className=" h-1 bg-amber-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-md"
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
            Create Your Signature Piece
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-8 sm:mb-10">
            Every piece is handcrafted with love and attention to detail
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-5 bg-amber-600 text-white rounded-full text-lg sm:text-xl font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-500/30"
          >
            Begin Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
}

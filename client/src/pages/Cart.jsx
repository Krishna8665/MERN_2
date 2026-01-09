// src/pages/Cart.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

// Mock cart data (replace with real cart state/context/API later)
const mockCartItems = [
  {
    id: 1,
    name: "Classic Chicken Steamed Momo",
    price: 320,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1626700055272-8e4c0e9b7a5e?w=400",
    type: "Chicken",
  },
  {
    id: 2,
    name: "Veg Special Momo",
    price: 280,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1626645738538-2c4f7e0b0e2d?w=400",
    type: "Veg",
  },
  {
    id: 3,
    name: "Cheesy Blast Momo",
    price: 380,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1626645738538-2c4f7e0b0e2d?w=400",
    type: "Veg",
  },
  {
    id: 3,
    name: "Cheesy Blast Momo",
    price: 380,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1626645738538-2c4f7e0b0e2d?w=400",
    type: "Veg",
  },
  {
    id: 3,
    name: "Cheesy Blast Momo",
    price: 380,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1626645738538-2c4f7e0b0e2d?w=400",
    type: "Veg",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [loading, setLoading] = useState(true);

  // Simulate loading cart from API/context
  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, Math.min(10, item.quantity + change)),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 60; // fixed example
  const total = subtotal + delivery;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Your Cart ({cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any momos yet. Let's fix that!
            </p>
            <Link
              to="/shop"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition font-medium"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items - Left/Main Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.type} • NPR {item.price}
                      </p>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center gap-6 sm:gap-8 w-full sm:w-auto justify-between sm:justify-start mt-3 sm:mt-0">
                      <div className="inline-flex items-center border border-gray-300 rounded-full bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 sm:px-4 py-2 hover:bg-gray-100 transition"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 sm:px-6 py-2 text-base font-medium min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 sm:px-4 py-2 hover:bg-gray-100 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-base sm:text-lg font-bold text-orange-600">
                          NPR {item.price * item.quantity}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:text-red-800 transition"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary - Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 sticky top-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-medium">NPR {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">NPR {delivery}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-base sm:text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">NPR {total}</span>
                  </div>
                </div>
                <Link to="/checkout">
                  <button className="w-full bg-orange-600 text-white py-4 px-6 rounded-full hover:bg-orange-700 transition flex items-center justify-center gap-2 font-medium text-base sm:text-lg">
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </button>
                </Link>

                <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
                  Taxes and discounts will be applied at checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

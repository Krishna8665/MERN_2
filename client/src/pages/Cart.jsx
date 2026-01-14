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
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost:3000"; // Change to your real backend URL

// Helper function to safely extract ID as string
const extractId = (item) => {
  if (!item) return null;

  // If it's already a string
  if (typeof item === "string") return item;

  // If it's an object with _id property
  if (item._id) {
    return typeof item._id === "string" ? item._id : String(item._id);
  }

  // If it's a MongoDB ObjectId or similar object
  if (item.$oid) return item.$oid;

  // Last resort: convert to string
  return String(item);
};

export default function Cart() {
  const { token, isAuthenticated, isLoading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      // Wait for auth to finish loading
      if (authLoading) {
        return;
      }

      if (!isAuthenticated) {
        setError("Please login to view your cart");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const backendData = response.data.data || [];

        if (backendData.length === 0) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        console.log("Cart backend data:", backendData); // Debug log

        // Check if backend returned full product objects or just IDs
        const isFullProducts =
          backendData.length > 0 &&
          typeof backendData[0] === "object" &&
          backendData[0].productName;

        if (isFullProducts) {
          // Backend returned full product objects (with .populate())
          // Each item gets a unique cartId for independent management
          const productsWithCartId = backendData.map((product, index) => ({
            ...product,
            cartId: `cart-${extractId(product)}-${index}-${Date.now()}`,
            quantity: 1,
          }));
          setCartItems(productsWithCartId);
        } else {
          // Backend returned just IDs - fetch product details
          const productIds = backendData
            .map(extractId)
            .filter((id) => id && id !== "null" && id !== "undefined");

          console.log("Extracted cart product IDs:", productIds); // Debug log

          // Fetch full product details for each ID
          const productPromises = productIds.map(async (productId, index) => {
            try {
              const productRes = await axios.get(
                `${API_BASE}/product/${productId}`
              );
              const product = productRes.data.data?.product?.[0];
              return product
                ? {
                    ...product,
                    cartId: `cart-${productId}-${index}-${Date.now()}`,
                    quantity: 1,
                  }
                : null;
            } catch (err) {
              console.error(
                `Failed to fetch product ${productId}:`,
                err.message
              );
              return null;
            }
          });

          const fullItems = (await Promise.all(productPromises)).filter(
            Boolean
          );
          setCartItems(fullItems);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load cart");
        console.error("Cart fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, token, authLoading]);

  // Update quantity locally by cartId (unique identifier)
  const updateQuantity = async (cartId, change) => {
    const item = cartItems.find((i) => i.cartId === cartId);
    if (!item) return;

    const newQty = item.quantity + change;
    if (newQty < 1 || newQty > 10) return;

    const oldQty = item.quantity;
    const productId = extractId(item);

    // Update local state immediately
    setCartItems((prev) =>
      prev.map((i) =>
        i.cartId === cartId ? { ...i, quantity: newQty } : i
      )
    );

    // Sync with backend
    if (isAuthenticated && token) {
      try {
        const diff = newQty - oldQty;

        if (diff > 0) {
          // Increase: add diff times to backend
          for (let i = 0; i < diff; i++) {
            await axios.post(
              `${API_BASE}/cart/${productId}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );
          }
        } else if (diff < 0) {
          // Decrease: remove diff times from backend
          for (let i = 0; i < Math.abs(diff); i++) {
            await axios.delete(`${API_BASE}/cart/${productId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
          }
        }
      } catch (err) {
        console.error("Failed to update backend cart:", err);
        // Revert on error
        setCartItems((prev) =>
          prev.map((i) =>
            i.cartId === cartId ? { ...i, quantity: oldQty } : i
          )
        );
        alert("Failed to update quantity. Please try again.");
      }
    }
  };

  // Remove item from cart by cartId (backend + local)
  const removeItem = async (cartId) => {
    if (!window.confirm("Remove this item from cart?")) return;

    const item = cartItems.find((i) => i.cartId === cartId);
    if (!item) return;

    const productId = extractId(item);

    try {
      // Remove from backend (removes one instance)
      await axios.delete(`${API_BASE}/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update local state
      setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
      alert("Item removed from cart");
    } catch (err) {
      console.error("Remove item error:", err);
      alert(err.response?.data?.message || "Failed to remove item");
    }
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );
  const delivery = 60;
  const total = subtotal + delivery;

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3">
            {error}
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to view your cart and continue shopping.
          </p>
          <Link
            to="/login?redirect=/cart"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition font-medium"
          >
            Go to Login
          </Link>
        </div>
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
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={
                          item.productImage || "https://via.placeholder.com/150"
                        }
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.mainType} • NPR {item.productPrice}
                      </p>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center gap-6 sm:gap-8 w-full sm:w-auto justify-between sm:justify-start mt-3 sm:mt-0">
                      <div className="inline-flex items-center border border-gray-300 rounded-full bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="px-3 sm:px-4 py-2 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 sm:px-6 py-2 text-base font-medium min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="px-3 sm:px-4 py-2 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity >= 10}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-base sm:text-lg font-bold text-orange-600">
                          NPR {item.productPrice * item.quantity}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.cartId)}
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

            {/* Order Summary */}
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
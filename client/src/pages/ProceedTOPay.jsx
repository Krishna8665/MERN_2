// src/pages/Checkout.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  CreditCard,
  Truck,
  MapPin,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    name: "Classic Chicken Steamed Momo",
    price: 320,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1626700055272-8e4c0e9b7a5e?w=400",
  },
  {
    id: 2,
    name: "Veg Special Momo",
    price: 280,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1626645738538-2c4f7e0b0e2d?w=400",
  },
  {
    id: 3,
    name: "Cheesy Blast Momo",
    price: 380,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1626645738538-2c4f7e0b0e2d?w=400",
  },
];

export default function Checkout() {
  const [isAddressOpen, setIsAddressOpen] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("esewa");

  const subtotal = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 60;
  const total = subtotal + delivery;

  const paymentOptions = [
    { id: "esewa", name: "eSewa", icon: "eS" },
    { id: "khalti", name: "Khalti", icon: "K" },
    { id: "cash", name: "Cash on Delivery", icon: "COD" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Checkout
          </h1>
          <Link
            to="/cart"
            className="flex items-center text-orange-600 hover:text-orange-700 text-sm sm:text-base font-medium"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left - Checkout Form */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Delivery Address - Accordion */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div
                className="p-5 sm:p-6 border-b border-gray-100 flex justify-between items-center cursor-pointer"
                onClick={() => setIsAddressOpen(!isAddressOpen)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <MapPin className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Delivery Address
                    </h3>
                    <p className="text-sm text-gray-600">Kathmandu, Thamel</p>
                  </div>
                </div>
                {isAddressOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {isAddressOpen && (
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Ram Bahadur"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="9801234567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Address
                    </label>
                    <textarea
                      defaultValue="Thamel, Kathmandu, Near Garden of Dreams"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Landmark (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Near Garden of Dreams"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Note
                      </label>
                      <input
                        type="text"
                        placeholder="Leave at security"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method - Now also Accordion/Dropdown */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div
                className="p-5 sm:p-6 border-b border-gray-100 flex justify-between items-center cursor-pointer"
                onClick={() => setIsPaymentOpen(!isPaymentOpen)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <CreditCard className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Payment Method
                    </h3>
                    <p className="text-sm text-gray-600">
                      {paymentOptions.find((opt) => opt.id === paymentMethod)
                        ?.name || "Select method"}
                    </p>
                  </div>
                </div>
                {isPaymentOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {isPaymentOpen && (
                <div className="p-5 sm:p-6 space-y-4">
                  {paymentOptions.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition
                        ${
                          paymentMethod === method.id
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="hidden"
                      />
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                        ${
                          paymentMethod === method.id
                            ? "bg-orange-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {method.icon}
                      </div>
                      <span className="font-medium">{method.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 sticky top-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-8">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.quantity} × NPR {item.price}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      NPR {item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>NPR {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>NPR {delivery}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">NPR {total}</span>
                </div>
              </div>

              {/* Place Order */}
              <button className="w-full bg-orange-600 text-white py-4 px-6 rounded-full hover:bg-orange-700 transition flex items-center justify-center gap-2 font-medium text-base">
                <CheckCircle size={18} />
                Place Order
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                By placing order you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

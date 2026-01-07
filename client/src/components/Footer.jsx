// src/components/common/Footer.jsx
import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="container mx-auto px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & About */}
          <div>
            <h3 className="text-3xl font-playfair font-bold text-blck=== mb-4">
              Momo<span className="text-orange-500">Hub</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-xs">
              Handcrafted momos with authentic flavors from the Himalayas. Fresh
              ingredients, bold tastes, made with love.
            </p>
            <div className="flex gap-5">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Instagram size={22} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Facebook size={22} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Twitter size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-orange-400 transition-colors"
                >
                  All Momos
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-orange-400 transition-colors"
                >
                  My Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-orange-400 transition-colors"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Flavors Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Popular Flavors
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/shop?flavor=classic"
                  className="hover:text-orange-400 transition-colors"
                >
                  Classic Chicken
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?flavor=spicy"
                  className="hover:text-orange-400 transition-colors"
                >
                  Fiery Chili
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?flavor=veggie"
                  className="hover:text-orange-400 transition-colors"
                >
                  Veg Special
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?flavor=cheese"
                  className="hover:text-orange-400 transition-colors"
                >
                  Cheesy Blast
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?flavor=pork"
                  className="hover:text-orange-400 transition-colors"
                >
                  Pork Momo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-orange-500 mt-1" />
                <span>
                  Pokhara, Nepal
                  <br />
                  Chipledhunga • Newroad • Lakeside
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-orange-500" />
                <span>+977 980-1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-orange-500" />
                <span>hello@momohub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Responsive Version */}
        <div className="mt-16 pt-10 border-t border-gray-800">
          {/* Copyright - always centered */}
          <p className="text-gray-500 text-sm text-center mb-4 md:mb-0">
            © {new Date().getFullYear()} MomoHub. All rights reserved.
          </p>

          {/* Links - centered on mobile, right-aligned on desktop */}
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
            <Link
              to="/privacy"
              className="text-sm text-gray-500 hover:text-orange-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-500 hover:text-orange-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/refund"
              className="text-sm text-gray-500 hover:text-orange-400 transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// src/components/common/Navbar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { cartCount } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h3 className="text-3xl font-playfair font-bold text-bla mb-4">
              Momo<span className="text-orange-500">Hub</span>
            </h3>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-amber-600"
                    : "text-gray-700 hover:text-amber-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-amber-600"
                    : "text-gray-700 hover:text-amber-600"
                }`
              }
            >
              Shop
            </NavLink>

            {user && isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-amber-600"
                      : "text-gray-700 hover:text-amber-600"
                  }`
                }
              >
                Admin
              </NavLink>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            {/* Cart */}
            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-medium 
                               rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User/Profile */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <User className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" />
                  <span className="hidden md:inline text-sm text-gray-700">
                    {user.name?.split(" ")[0] || "Account"}
                  </span>
                </button>

                {/* Dropdown */}
                <div
                  className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                >
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                    >
                      My Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-100">
            <div className="flex flex-col gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-medium ${isActive ? "text-amber-600" : "text-gray-700"}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `font-medium ${isActive ? "text-amber-600" : "text-gray-700"}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </NavLink>

              {user && isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `font-medium ${
                      isActive ? "text-amber-600" : "text-gray-700"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </NavLink>
              )}

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-600 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

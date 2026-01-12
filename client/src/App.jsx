// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Shop from "./pages/Shop";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgetPassword";

import ResetPassword from "./pages/Auth/ResetPassword";
import OtpVerify from "./pages/Auth/OtpVerify";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/ProceedTOPay";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProduct";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import AdminUsers from "./pages/admin/AdminUser";
import MainLayout from "./layouts/MainLayout";
import ToastConfig from "./components/ToastConfig";

// import Cart from "./pages/Cart";
// import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-stone-50 to-white">
      {/* Navbar - always visible */}
      <ToastConfig/>

      <ScrollToTop />

      <Routes>
        {/* Normal user routes - with Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* Add more routes as you create pages */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otp-verify" element={<OtpVerify />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* Admin routes - separate admin layout (sidebar + header, no footer) */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<AdminAddProduct />} />
          <Route
            path="/admin/products/:id/edit"
            element={<AdminEditProduct />}
          />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import Shop from "./pages/Shop";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgetPassword";

import ResetPassword from "./pages/Auth/ResetPassword";
import OtpVerify from "./pages/Auth/OtpVerify";

// import Cart from "./pages/Cart";
// import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-stone-50 to-white">
        {/* Navbar - always visible */}
        <Navbar />

        {/* Main content - grows to push footer down */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes as you create pages */}
            <Route path="/shop" element={<Shop />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* <Route path="/product/:id" element={<ProductPage />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/otp-verify" element={<OtpVerify />} />
          </Routes>
        </main>

        {/* Footer - always at the bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

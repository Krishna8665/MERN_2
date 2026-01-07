// src/pages/VerifyOTP.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OtpVerify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const email = localStorage.getItem("resetEmail") || "";

  useEffect(() => {
    if (!email) {
      navigate("/forget-password");
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 4) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: Number(otpValue) }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Invalid OTP");

      setError("");
      localStorage.setItem("otpVerified", "true");
      navigate("/reset-password");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-10 text-center text-white">
          <h2 className="text-3xl font-bold">Verify OTP</h2>
          <p className="mt-3">Enter the 4-digit code sent to</p>
          <p className="font-medium mt-1">{email}</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-0 outline-none transition"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.join("").length !== 4}
              className={`w-full py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition
                ${
                  loading || otp.join("").length !== 4
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Didn't receive the code?{" "}
              <button
                onClick={() => navigate("/forget-password")}
                className="text-orange-600 hover:underline font-medium"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerify;

import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('Line.png')" }}
    >
      <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl p-6 sm:p-8 md:p-10">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-blue-400 mb-5 sm:mb-7">
          Login
        </h2>
        <p className="text-center font-bold text-gray-500 text-xs sm:text-sm mb-5 sm:mb-6">
          Welcome! Sign in using your social <br className="hidden sm:block" />
          account or email to continue.
        </p>

        <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
          <button className="p-2 hover:scale-110 transition">
            <FaFacebook className="text-blue-600 text-xl sm:text-2xl" />
          </button>
          <button className="p-2 hover:scale-110 transition">
            <FcGoogle className="text-xl sm:text-2xl" />
          </button>
          <button className="p-2 hover:scale-110 transition">
            <BsApple className="text-black text-xl sm:text-2xl" />
          </button>
        </div>

        <form
          onSubmit={handleLoginSubmit}
          className="space-y-4 sm:space-y-6 bg-transparent"
        >
          <div className="border-b border-gray-300 py-2 w-full max-w-xs sm:max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-1 py-1 outline-none text-sm bg-transparent"
              required
            />
          </div>
          <div className="border-b border-gray-300 py-2 w-full max-w-xs sm:max-w-sm mx-auto">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-1 py-1 outline-none text-sm bg-transparent"
              required
            />
          </div>
          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              className="w-full sm:w-[200px] mx-auto block py-2 sm:py-3 rounded-2xl bg-white/30 text-black font-medium border border-gray-200 shadow-sm hover:bg-gray-50 transition"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}


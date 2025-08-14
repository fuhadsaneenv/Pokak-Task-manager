import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { name, email, password } = formData;

    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error("Valid email is required");
      return false;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axiosInstance.post("/user/register", formData);
      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('Line.png')" }}
    >
      <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-lg w-[750px] min-h-[500px] p-10">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-7">
          Register
        </h2>
        <p className="text-center font-bold text-gray-500 text-sm mb-6">
          Welcome! Sign in using your social <br />
          account or email to continue.
        </p>

        <div className="flex justify-center space-x-6 mb-8">
          <button className="p-2">
            <FaFacebook className="text-blue-600 text-2xl" />
          </button>
          <button className="p-2">
            <FcGoogle className="text-2xl" />
          </button>
          <button className="p-2">
            <BsApple className="text-black text-2xl" />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleRegisterSubmit}>
          <div className="border-b border-gray-300 py-2 w-[300px] mx-auto">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-1 py-1 outline-none text-sm bg-transparent"
              required
            />
          </div>

          <div className="border-b border-gray-300 py-2 w-[300px] mx-auto">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-1 py-1 outline-none text-sm bg-transparent"
              required
            />
          </div>

          <div className="border-b border-gray-300 py-2 w-[300px] mx-auto">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-1 py-1 outline-none text-sm bg-transparent"
              required
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-[200px] mx-auto block py-3 rounded-2xl bg-white/30 text-black font-medium border border-gray-200 shadow-sm hover:bg-gray-50 transition"
            >
              Register
            </button>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-purple-600 font-medium hover:underline"
              >
                Log in
              </a>
            </p>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

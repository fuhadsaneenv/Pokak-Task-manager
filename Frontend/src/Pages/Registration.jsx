import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axiosInstance.post("/user/register", formData);
      console.log("Registration success:", data);
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
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
          account or email to continue us.
        </p>
        {error && (
          <div className="text-center text-red-500 mb-4 font-semibold">{error}</div>
        )}
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
        <form className="space-y-6 bg-transparent" onSubmit={handleRegisterSubmit}>
          <div className="border-b border-gray-300 py-2 w-[300px] mx-auto">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-[300px] mx-auto block px-1 py-1 outline-none text-sm bg-transparent"
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
              className="w-[300px] mx-auto block px-1 py-1 outline-none text-sm bg-transparent"
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
              className="w-[300px] mx-auto block px-1 py-1 outline-none text-sm bg-transparent"
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
      </div>
    </div>
  );
}

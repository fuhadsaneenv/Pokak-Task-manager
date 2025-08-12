import React from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'

export default function Login() {
  return (
    <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{
        backgroundImage:
          "url('Line.png')",
      }}
    >
      <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-lg w-[800px] min-h-[750px] p-10">

        <h2 className="text-xl font-bold text-center text-blue-400 mb-7">
          Login
        </h2>
        <p className="text-center font-bold  text-gray-500 text-sm mb-6">
          Welcome! Sign in using your social <br/>
          account or email to continue us.
        </p>
        {/* Social Login */}
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
        {/* Form */}
        <form className="space-y-6 bg-transparent">
          <div className="border-b border-gray-300 py-2 w-[300px] mx-auto">
            <input
              type="email"
              placeholder="Email"
              className="w-[300px] mx-auto block px-1 py-1 outline-none text-sm bg-transparent"
            />
          </div>
          <div className="border-b border-gray-300 py-2 w-[300px] mx-auto">
            <input
              type="password"
              placeholder="Password"
              className="w-[300px] mx-auto block px-1 py-1 outline-none text-sm bg-transparent"
            />
          </div>
          <div className="pt-6">
            <button
              type="submit"
              className="w-[200px] mx-auto block py-3 rounded-2xl bg-white/30 text-black font-medium border border-gray-200 shadow-sm hover:bg-gray-50 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";

import signin_bg3 from "../assets/signin_bg3.jpg"; // Import your background image
import mail_icon from "../assets/mail_icon.svg"; // Import your person icon image
import lock_icon from "../assets/lock_icon.svg"; // Import your person icon image

export default function UserLogin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        dispatch(signInFailure(data.message || "Login failed"));
      }
    } catch (error) {
      dispatch(signInFailure(error.message || "Something went wrong"));
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${signin_bg3})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Dark overlay */}
      <div className="relative z-10 bg-slate-900 p-10 rounded-lg shadow-lg w-full max-w-md text-indigo-300 text-sm">
        <h1 className="text-4xl font-semibold text-center text-white mb-3">
          Login
        </h1>

        <p className="text-center text-sm mb-6">Login to Your Account!</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-5 px-5 py-3 rounded-full bg-[#333A5C]">
            <img src={mail_icon} alt="" />
            <input
              type="email"
              placeholder="Email ID"
              className="bg-transparent outline-none"
              id="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-5 px-5 py-3 rounded-full bg-[#333A5C]">
            <img src={lock_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none w-full text-white"
              id="password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            } text-lg mt-2`}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 mt-4 text-center text-sm">{error}</p>
        )}

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Forgot your password?{" "}
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-blue-400 cursor-pointer underline"
            >
              Reset here
            </span>
          </p>
        </div>

        {/* Register Page Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 cursor-pointer underline"
            >
              Register here
            </span>
          </p>
        </div>

        {/* Employee Login Link */}
        <div className="mt-2 text-center">
          <p className="text-gray-400">
            Are you an employee?{" "}
            <span
              onClick={() => navigate("/employeeLogin")}
              className="text-blue-400 cursor-pointer underline"
            >
              Employee Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

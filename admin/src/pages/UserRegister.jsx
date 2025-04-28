import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../images/background.jpg";
import mail_icon from "../assets/mail_icon.svg"; // Import your person icon image
import lock_icon from "../assets/lock_icon.svg"; // Import your person icon image
import person_icon from "../assets/person_icon.svg"; // Import your person icon image
import signin_bg1 from "../assets/signin_bg1.jpg"; // Import your background image
import signin_bg2 from "../assets/signin_bg2.jpg"; // Import your background image
import signin_bg3 from "../assets/signin_bg3.jpg"; // Import your background image


export default function UserRegister() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [passwordError, setPasswordError] = useState(""); // State for password validation error
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 letter, 1 number
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.mobile ||
      !formData.address ||
      !formData.password ||
      !confirmPassword
    ) {
      return setError("Please fill all the fields");
    }

    // Password validation
    if (!validatePassword(formData.password)) {
      return setPasswordError(
        "Password must be at least 8 characters long and include both letters and numbers"
      );
    }

    // Confirm password validation
    if (formData.password !== confirmPassword) {
      return setPasswordError("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      if (res.ok) {
        navigate("/login"); // Redirect to login page after successful registration
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen py-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Dark overlay */}
      <div className="relative z-10 bg-slate-900 p-10 rounded-lg shadow-lg w-full max-w-[700px] text-indigo-300 text-sm">

        <h1 className="text-4xl font-semibold text-center text-white mb-3">
          Sign Up
        </h1>

        <p className="text-center text-sm mb-6">Create a New Account!</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Username */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#333A5C]">
              
              <input
                type="text"
                placeholder="Username"
                className="bg-transparent outline-none w-full text-white"
                id="username"
                onChange={handleChange}
                required
              />
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#333A5C]">
            
              <input
                type="text"
                placeholder="Mobile"
                className="bg-transparent outline-none w-full text-white"
                id="mobile"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#333A5C]">
            
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full text-white"
                id="password"
                onChange={(e) => {
                  handleChange(e);
                  setPasswordError("");
                }}
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#333A5C]">
           
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none w-full text-white"
                id="email"
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#333A5C]">
             
              <input
                type="text"
                placeholder="Address"
                className="bg-transparent outline-none w-full text-white"
                id="address"
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#333A5C]">
              
              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-transparent outline-none w-full text-white"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError("");
                }}
                required
              />
            </div>
          </div>

          {/* Submit Button - Full Width Below Grid */}
          <div className="col-span-2 flex justify-center" >
            <button
              disabled={loading}
              className={`w-60 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              } text-lg mt-4`}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <p className="text-red-500 mt-4 text-center text-sm">{error}</p>
        )}
        {passwordError && (
          <p className="text-red-500 mt-4 text-center text-sm">
            {passwordError}
          </p>
        )}

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Log in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

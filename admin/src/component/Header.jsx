import React, { useState } from "react";
import { Link } from "react-router-dom";
import tblogo from "../assets/logo_tb2.png"; // Assuming you have a logo image
import ic_login from "../assets/ic_login.png"; // Login icon (if needed)
import { useSelector, useDispatch } from "react-redux";
import { FaBell, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa"; // Using react-icons for better icons
import ic_profile from "../assets/ic_profile.png"; // Another login icon (if needed)
import ic_settings from "../assets/ic_settings.png"; // Settings icon (if needed)
import ic_bell from "../assets/ic_bell.png"; // Notification icon (if needed)
import { signOutUserStart, deleteUserFailure, deleteUserSuccess } from "../redux/user/userSlice";



export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/users/signout", { method: "GET" });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <header className="bg-[#0d0c46] text-[#ff7cbd] shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Shop Name */}
        
        {/* <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={tblogo} alt="" className="w-49 sm:w-60" /> */}

        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-[#660708] transition-colors">
          <img src={tblogo} alt="" className="w-49 sm:w-60" />
          </Link>
        </div>

        {/* Right-side icons */}
        <div className="flex space-x-6 items-center">
          {/* Icons for notifications and settings */}
          <button className="text-[#F5F3F4] hover:text-[#660708] transition-colors">
          <img
                  src={ic_bell}
                  className="w-7 h-7 object-cover transition duration-300 hover:drop-shadow-[0_0_10px_white]"
                /> {/* Notification icon */}
          </button>

    
          <button className="text-[#F5F3F4] hover:text-[#660708] transition-colors">
  <img
    src={ic_settings}
    className="w-7 h-7 object-cover transition duration-300 hover:drop-shadow-[0_0_10px_white]"
    alt="Settings"
  />
</button>



          {/* Conditionally render Login or Profile based on login status */}
          {currentUser ? (
            <div className="relative">
              {/* Profile picture with dropdown */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 overflow-hidden rounded-full focus:outline-none hover:border-[#6d073a] transition-colors"
              >
                <img 
                  src={ic_profile}
                  alt="Profile"
                  className="w-full h-full object-cover transition duration-300 hover:drop-shadow-[0_0_10px_white]"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#F5F3F4] text-[#161A1D] shadow-lg rounded-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-[#660708] hover:text-[#F5F3F4] transition-colors"
                  >
                    <FaUser className="inline-block mr-2" /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-[#660708] hover:text-[#F5F3F4] transition-colors"
                  >
                    <FaCog className="inline-block mr-2" /> Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-[#660708] hover:text-[#F5F3F4] transition-colors"
                  >
                    <FaSignOutAlt className="inline-block mr-2" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <div className="flex space-x-6 items-center">
              <button className="text-[#F5F3F4] hover:text-[#660708] transition-colors">
          <img
                  src={ic_login}
                  className="w-7 h-7 object-cover transition duration-300 hover:drop-shadow-[0_0_10px_white]"
                /> {/* Notification icon */}
          </button>
          </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
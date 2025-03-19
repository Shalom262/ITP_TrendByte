import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hello Customer
        <img className="w-8 aspect-square" src={assets.hand_wave} alt="" />
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to TrendByte
      </h2>

      <p className="mb-6 max-w-md">
        Discover the latest trends and style your wardrobe with ease. Shop your
        favorite outfits, customize your look, and enjoy a seamless shopping
        experience.
      </p>

      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-300 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;

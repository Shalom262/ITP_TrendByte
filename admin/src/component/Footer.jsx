import React from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#161A1D] text-[#F5F3F4] py-5">
      <div className="container mx-auto px-4 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-3 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Shop", "About Us", "Contact Us", "Privacy Policy"].map((text, i) => (
                <li key={i}>
                  <a
                    href={`/${text.toLowerCase().replace(/\s+/g, "")}`}
                    className="hover:text-[#E63946] transition duration-150 text-sm"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h3 className="text-base font-semibold mb-3 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope className="text-[#E63946] text-sm" />
                <a
                  href="mailto:info@clothingstore.com"
                  className="hover:text-[#E63946] transition text-sm"
                >
                  trendbyte4clothing@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <FaPhone className="text-[#E63946] text-sm" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-[#E63946] transition text-sm"
                >
                  +94 123 456 789
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <FaMapMarkerAlt className="text-[#E63946] text-sm" />
                <p className="text-sm">123 Fashion St, Malabe, Colombo</p>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-base font-semibold mb-3 uppercase tracking-wider">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {[
                { icon: <FaFacebook />, link: "https://facebook.com" },
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaInstagram />, link: "https://instagram.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E63946] transition text-base"
                >
                  {React.cloneElement(social.icon, { size: 18 })}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#660708] mt-5 pt-3 text-center text-xs opacity-80">
          &copy; {new Date().getFullYear()} Clothing Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
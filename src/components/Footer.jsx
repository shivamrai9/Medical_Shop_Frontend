import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700 ">
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
        {/* Left Text */}
        <p className="text-gray-400 text-center lg:text-left">
          © 2025 All Rights Reserved —{" "}
          {/* <span className="font-semibold text-white">Shivam Rai</span> */}
          <span className="font-semibold text-white">Amit </span>
        </p>

        {/* Contact & Social Icons */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <a
            href="mailto:shivamrai5476@gmail.com"
            className="hover:text-blue-400 transition duration-200 text-gray-300 text-sm underline"
          >
            {/* shivamrai5476@gmail.com */}
            Medikit shop online
          </a>

          <div className="flex items-center gap-4 text-xl">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

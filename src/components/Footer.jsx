import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>© All Rights Reserved Shivam rai () 2025.</p>

        <div className="flex items-center gap-4 justify-center text-2xl">
          <a href="" className="hover:text-primary-100 text-sm">
            shivamrai5476@gmail.com
          </a>
          <a href="" className="hover:text-primary-100">
            <FaFacebook />
          </a>
          <a
            href="https://portfolio-mauve-delta-11.vercel.app/"
            target='_blank'
            className="hover:text-primary-100"
          >
            <FaInstagram />
          </a>
          <a href="" className="hover:text-primary-100">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer

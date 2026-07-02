import React from 'react'
import logo from "../assets/gs1.jpeg"

function Footer() {
  return (
    <footer className="w-full bg-[#dbfcfcec] mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10">

        {/* Logo */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="GS Fashion" className="w-10 h-10" />
            <h2 className="text-xl font-bold">𝐺𝐒 Fashion</h2>
          </div>

          <p className="mt-4 text-gray-700 hidden md:block">
            GS Fashion is your all-in-one online shopping destination,
            offering top-quality products, unbeatable deals, and fast
            delivery backed by trusted service.
          </p>

          <p className="mt-3 text-gray-700 md:hidden">
            Fast. Easy. Reliable. GS Fashion.
          </p>
        </div>

        {/* Company */}
        <div className="md:w-1/3 text-center">
          <h2 className="text-xl font-semibold mb-4">COMPANY</h2>

          <ul className="space-y-2 text-gray-700">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:w-1/3 text-center">
          <h2 className="text-xl font-semibold mb-4">GET IN TOUCH</h2>

          <ul className="space-y-2 text-gray-700">
            <li>+91 8971800152</li>
            <li>girishky78@gmail.com</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-400 py-4 text-center text-sm">
        © 2025 GS Fashion. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
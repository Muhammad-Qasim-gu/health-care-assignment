"use client";
import React from "react";
import Link from "next/link";
import cookie from "js-cookie";
import { headerText } from "../../_common/constant/constant";
const Header: React.FC = () => {
  const handleLogout = () => {
    cookie.remove("token");
    window.location.replace("/login");
  };






  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/home">
              <span className="text-2xl font-bold text-blue-600">MyLogo</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link
              href="/home"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {headerText.home}
            </Link>
            <Link
              href="/add-medicine"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {headerText.addMed}
            </Link>
            <Link
              href="/add-diseases"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {headerText.addDisease}
            </Link>
            <Link
              href="/checkup"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {headerText.checkUp}
            </Link>

            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {headerText.logOut}
            </button>
          </div>

          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

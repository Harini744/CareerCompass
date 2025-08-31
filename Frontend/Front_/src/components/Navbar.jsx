import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav
            className="fixed top-0 w-full z-50 shadow-sm"
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            }}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center text-purple-900 font-black text-3xl"
                >
                    <span className="font-weight-bold" style={{ color: '#8a2be2' }}>Career Compass</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link
                        to="/about"
                        className="font-medium text-gray-600 hover:text-purple-600 hover:scale-105 transition transform duration-200 ease-in-out"
                    >
                        About
                    </Link>
                    <Link
                        to="/domains"
                        className="font-medium text-gray-600 hover:text-purple-600 hover:scale-105 transition transform duration-200 ease-in-out"
                    >
                        Domains
                    </Link>
                    <Link
                        to="/dashboard"
                        className="font-medium text-gray-600 hover:text-purple-600 hover:scale-105 transition transform duration-200 ease-in-out"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/contact"
                        className="font-medium text-gray-600 hover:text-purple-600 hover:scale-105 transition transform duration-200 ease-in-out"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200"
                    >
                        Login
                    </Link>
                        <Link
                              to="/"
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors duration-200 font-semibold text-center"
    >
      Get Started
    </Link>

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-black hover:text-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-dark bg-opacity-10 backdrop-blur-md shadow-lg">
                    <Link
                        to="/about"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-white hover:bg-gray-100 hover:scale-105 transition transform duration-200 rounded-md"
                    >
                        About
                    </Link>
                    <Link
                        to="/domains"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-white hover:bg-gray-100 hover:scale-105 transition transform duration-200 rounded-md"
                    >
                        Domains
                    </Link>
                    <Link
                        to="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-white hover:bg-gray-100 hover:scale-105 transition transform duration-200 rounded-md"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-white hover:bg-gray-100 hover:scale-105 transition transform duration-200 rounded-md"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-white bg-gray-900 hover:bg-gray-800 rounded-md transition-colors duration-200"
                    >
                        Login
                    </Link>
                    {/* ✅ Added Get Started link */}
                       <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors duration-200 font-semibold text-center"
    >
      Get Started
    </Link>

                </div>
            )}
        </nav>
    );
};

export default Navbar;

import React from 'react';

// A React component for the Career Compass website footer.
// It features a logo, navigation links, and copyright information.
const FooterPage =() =>{
  return (
    // Main footer container with a black background, padding, and text color.
    <footer className="bg-black py-10 text-gray-400 font-sans">
      {/* Load Tailwind CSS from CDN */}
      <script src="https://cdn.tailwindcss.com"></script>

      {/* Main content wrapper */}
      <div className="container mx-auto px-4">
        {/* Top section with logo and navigation links */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-8 border-b border-gray-700">
          
          {/* Logo and brand name */}
          <div className="flex items-center mb-6 md:mb-0">
            {/* SVG for the logo icon. */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-purple-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5l-5-5 1.41-1.41L11 14.67l7.59-7.59L20 8.5l-9 9z" />
            </svg>
            <span className="ml-3 text-2xl font-bold text-white">Career Compass</span>
          </div>

          {/* Navigation links */}
          <nav>
            <ul className="flex flex-wrap justify-center space-x-6">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Domains
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Quiz
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom section with copyright information */}
        <div className="text-center mt-8">
          <p className="text-sm">
            © 2024 Career Compass. Empowering your tech journey.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default FooterPage;

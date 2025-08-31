import React from 'react';

// Main application component to display the Career Compass workflow.
// This component shows a three-step process with a dark background.
const DomainModule = () => {
  return (
    // Main container with a dark background, responsive padding, and text styling.
    <div className="bg-black min-h-screen py-20 px-4 sm:px-8 font-sans text-white">
      {/* Load Tailwind CSS from CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="max-w-7xl mx-auto text-center">
        {/* Main Title Section */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          How Career Compass <span className="text-purple-400">Works</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Three simple steps to discover your perfect tech career.
        </p>

        {/* Workflow Steps Container: Now a horizontal flexbox that becomes vertical on small screens */}
        <div className="mt-16 flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-12">

          {/* Step 1: Take the Quiz */}
          <div className="flex flex-col items-center flex-shrink-0">
            {/* Step Number Circle */}
            <div className="w-20 h-20 rounded-full bg-purple-900 bg-opacity-30 border border-purple-500 flex items-center justify-center mb-6">
              <span className="text-3xl font-bold text-purple-400">01</span>
            </div>
            {/* Step Title */}
            <h3 className="text-xl font-bold mb-2">Take the Quiz</h3>
            {/* Step Description */}
            <p className="text-gray-400 max-w-sm">
              Answer AI-powered questions about your interests, skills, and career preferences.
            </p>
          </div>

          {/* Arrow Separator */}
          <div className="flex items-center justify-center my-6 lg:my-0 lg:flex-shrink-0">
            <svg className="w-16 h-16 text-purple-400 rotate-90 lg:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="12 5 19 12 12 19" />
              <line x1="19" y1="12" x2="5" y2="12" />
            </svg>
          </div>

          {/* Step 2: Explore Domains */}
          <div className="flex flex-col items-center flex-shrink-0">
            {/* Step Number Circle */}
            <div className="w-20 h-20 rounded-full bg-purple-900 bg-opacity-30 border border-purple-500 flex items-center justify-center mb-6">
              <span className="text-3xl font-bold text-purple-400">02</span>
            </div>
            {/* Step Title */}
            <h3 className="text-xl font-bold mb-2">Explore Domains</h3>
            {/* Step Description */}
            <p className="text-gray-400 max-w-sm">
              Discover detailed information about IT domains that match your quiz results.
            </p>
          </div>

          {/* Arrow Separator */}
          <div className="flex items-center justify-center my-6 lg:my-0 lg:flex-shrink-0">
            <svg className="w-16 h-16 text-purple-400 rotate-90 lg:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="12 5 19 12 12 19" />
              <line x1="19" y1="12" x2="5" y2="12" />
            </svg>
          </div>

          {/* Step 3: Follow Your Path */}
          <div className="flex flex-col items-center flex-shrink-0">
            {/* Step Number Circle */}
            <div className="w-20 h-20 rounded-full bg-purple-900 bg-opacity-30 border border-purple-500 flex items-center justify-center mb-6">
              <span className="text-3xl font-bold text-purple-400">03</span>
            </div>
            {/* Step Title */}
            <h3 className="text-xl font-bold mb-2">Follow Your Path</h3>
            {/* Step Description */}
            <p className="text-gray-400 max-w-sm">
              Get personalized roadmaps with skills, resources, and milestones to achieve your goals.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DomainModule;

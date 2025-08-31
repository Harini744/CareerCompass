import React, { useEffect, useRef } from 'react';

const DiscoverDomainsPage = () => {
  // Use refs to target the elements for animation.
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const featureRefs = useRef([]);
  featureRefs.current = []; // Clear the refs on each render

  // Function to add a ref to the array for each feature card.
  const addToRefs = (el) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  // The useEffect hook runs after the component is rendered.
  // This is where we will define and run our GSAP animations.
  useEffect(() => {
    // Check if the refs exist before starting the animations.
    if (window.gsap && headerRef.current && subtitleRef.current && featureRefs.current.length > 0) {
      const { gsap } = window;
      // Create a timeline for a more controlled animation sequence.
      const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

      // Animate the main header and subtitle to fade in and move up slightly.
      tl.from(headerRef.current, { y: 50, opacity: 0, delay: 0.2 })
        .from(subtitleRef.current, { y: 50, opacity: 0, duration: 0.8 }, '-=0.5');

      // Animate the feature cards to fade in and move up in a staggered sequence.
      // This creates a pleasing visual effect as they appear one after another.
      gsap.from(featureRefs.current, {
        y: 50,
        opacity: 0,
        stagger: 0.2, // This property makes the animations start one after another with a delay of 0.2 seconds.
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5, // Delay the start of the card animations until the header is done.
      });
    }
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // Array of feature objects.
  const features = [
    {
      title: 'Domain Discovery',
      description: 'Explore 20+ IT career domains with detailed roadmaps, salary insights, and skill requirements.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: 'AI-Powered Quizzes',
      description: 'Take personalized assessments to discover which tech career matches your interests and skills.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.674c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.674c-.414 0-.75.336-.75.75s.336.75.75.75zM12 21v-4.5m0-9v-4.5M3 13.5a9 9 0 0118 0" />
        </svg>
      )
    },
    {
      title: 'Personal Dashboard',
      description: 'Track your progress, view quiz results, and get personalized career recommendations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      )
    },
    {
      title: 'Career Roadmaps',
      description: 'Get clear learning paths with skills, tools, and milestones for your chosen domain.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
  ];

  return (
    // Updated background to black and text to white for contrast.
    <div className="bg-black min-h-screen py-16 font-sans text-white">
      {/* GSAP and Tailwind CSS are loaded via CDN scripts */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 ref={headerRef} className="text-4xl md:text-5xl font-extrabold leading-tight">
            Everything You Need to <span className="text-purple-400">Start Your Journey</span>
          </h1>
          <p ref={subtitleRef} className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and guidance you need to discover, plan, and pursue your ideal career in technology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addToRefs} // Add a ref for each feature card
              className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-purple-900 p-3 rounded-full flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DiscoverDomainsPage;

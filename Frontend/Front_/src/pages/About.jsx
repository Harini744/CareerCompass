import React from 'react';
import Navbar from '../components/Navbar';
import FooterPage from '../components/Footer';

const AboutPage = () => {
    return (
        <>
        <Navbar />
        <div className="bg-gray-900 text-gray-100 py-20 min-h-screen">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-white mb-4 animate-fade-in-up">About Career Compass</h1>
                    <p className="text-xl text-gray-300 animate-fade-in-up animation-delay-300">
                        Helping you discover and enter the tech field with confidence.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="flex flex-col md:flex-row items-center mb-20 md:space-x-12">
                    <div className="md:w-1/2 mb-8 md:mb-0 animate-slide-in-left">
                        <img
                            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop"
                            alt="Our Mission"
                            className="w-full h-auto object-cover rounded-2xl shadow-lg border-4 border-purple-500 transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="md:w-1/2 animate-slide-in-right">
                        <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Our mission is to guide freshers, students, and non-tech individuals as they confidently explore and enter the tech field. We aim to be your primary resource, providing clear roadmaps, curated learning paths, and actionable insights to simplify your entry into technology.
                        </p>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="flex flex-col md:flex-row-reverse items-center mb-20 md:space-x-12 md:space-x-reverse">
                    <div className="md:w-1/2 mb-8 md:mb-0 animate-slide-in-right">
                        <img
                            src="https://images.pexels.com/photos/8866736/pexels-photo-8866736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Our Vision"
                            className="w-full h-auto object-cover rounded-2xl shadow-lg border-4 border-blue-500 transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="md:w-1/2 animate-slide-in-left">
                        <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            We envision a world where career choices are no longer daunting. Our goal is to become the go-to platform for aspiring tech professionals, providing personalized insights and a supportive community. We strive to be the compass that points you towards a fulfilling and successful career, no matter where you are on your journey.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-slide-in-left {
                    animation: slideInLeft 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-slide-in-right {
                    animation: slideInRight 0.8s ease-out forwards;
                    opacity: 0;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animation-delay-300 {
                    animation-delay: 0.3s;
                }
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
            `}</style>
        </div>
        <FooterPage />
        </>
    );
};

export default AboutPage;

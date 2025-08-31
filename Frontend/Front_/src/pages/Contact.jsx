import React, { useState } from 'react';
import { toast } from "react-toastify";
import Navbar from '../components/Navbar';


const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all fields.");
            return;
        }

        // In a real application, you would send this data to a server.
        console.log('Form submitted:', formData);
        toast.success("Thank you for your message! We'll be in touch soon.");

        // Reset the form
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
        <Navbar />
        <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#1a1a1a] text-white overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-30 animate-pulse"></div>
            
            <div className="relative z-10 w-full max-w-2xl p-6 sm:p-8 bg-black bg-opacity-70 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-700 animate-fade-in-up">
                <h1 className="text-4xl font-bold mb-2 text-center text-purple-400">Contact Us</h1>
                <p className="text-md text-gray-400 mb-8 text-center">
                    Have questions or feedback? We'd love to hear from you. Fill out the form below.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
           
            <style>{`
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        opacity: 0.3;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 0.3;
                    }
                }
                
                .animate-pulse {
                    animation: pulse 10s infinite ease-in-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeIn 0.8s ease-out;
                }
            `}</style>
           
        </div>
       
        </>
    );
};

export default ContactPage;

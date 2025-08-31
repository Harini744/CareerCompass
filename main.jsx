import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This is the main application layout component.
// It contains the Outlet for rendering the specific page components.
// The Navbar component has been removed as per your request.
const App = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
            <div className="flex-grow">
                <Outlet />
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

// Page Components
const HomePage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Welcome to Career Compass</h1>
        <p className="text-xl text-gray-600 max-w-2xl text-center mb-8">
            Your guide to navigating the world of tech careers. Discover new domains, explore skills, and plan your journey.
        </p>
        <Link to="/domains" className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300">
            Start Your Journey
        </Link>
    </div>
);

const AboutPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Career Compass</h1>
        <p className="text-lg text-gray-600 max-w-2xl text-center">
            Career Compass is designed to help you find your way in the ever-evolving tech industry. We provide curated information on different career paths, essential skills, and project ideas to help you get started.
        </p>
    </div>
);

const DomainsPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Domains</h1>
        <p className="text-lg text-gray-600 max-w-2xl text-center">
            Dive into popular tech domains like Web Development, Data Science, and Cybersecurity. Each domain page will provide you with a roadmap to success.
        </p>
    </div>
);

const DashboardPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Dashboard</h1>
        <p className="text-lg text-gray-600 max-w-2xl text-center">
            This is your personalized space. Here you can track your progress, save your favorite domains, and find recommended resources.
        </p>
    </div>
);

const ContactPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl text-center">
            Have questions or feedback? We'd love to hear from you. Reach out to us through this page.
        </p>
    </div>
);

const LoginPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Login or Sign Up</h1>
        <p className="text-lg text-gray-600 max-w-2xl text-center">
            Join the Career Compass community to unlock more features.
        </p>
    </div>
);

const ResourcePage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
        <p className="text-lg text-gray-600 max-w-2xl text-center">
            A curated list of articles, tutorials, and tools to help you on your career journey.
        </p>
    </div>
);


// Define the router configuration
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App component acts as the layout
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/about", element: <AboutPage /> },
            { path: "/domains", element: <DomainsPage /> },
            { path: "/dashboard", element: <DashboardPage /> },
            { path: "/contact", element: <ContactPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/resource", element: <ResourcePage /> },
        ]
    },
]);

// Render the application to the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

export default App;

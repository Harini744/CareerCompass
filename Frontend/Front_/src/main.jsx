// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home.jsx';
import ResourcePage from './pages/Resource.jsx';
import ContactPage from './pages/Contact.jsx';
import AboutPage from './pages/About.jsx';
import QuizPage from './pages/Quizz.jsx';
import QuizDashboard from './pages/Dashboard.jsx';
import LoginPage from './pages/LoginRegister.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {path:'/login', element:<LoginPage /> },
  {path:'/domains', element:<ResourcePage /> },
  { path: '/about', element: <AboutPage /> },
  {path: '/contact', element: <ContactPage /> },
  {path: '/quizz' , element: <QuizPage/>},
  {path: '/dashboard' , element: <QuizDashboard/>},
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);

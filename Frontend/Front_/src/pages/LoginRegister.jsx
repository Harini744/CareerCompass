import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const googleClientId = "YOUR_GOOGLE_CLIENT_ID"; // Replace this
  const backendBaseUrl = "http://127.0.0.1:8000/api/";

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleLoginSuccess,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large' }
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [googleClientId]);

  const handleGoogleLoginSuccess = async (response) => {
    setMessage("Login successful. Verifying token with backend...");
    const idToken = response.credential;

    try {
      const backendResponse = await fetch(`${backendBaseUrl}auth/google/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken }),
      });

      if (backendResponse.ok) {
        const data = await backendResponse.json();
        setUserProfile(data.user);
        setIsAuthenticated(true);
        setMessage("User successfully authenticated by backend.");
      } else {
        setMessage("Backend verification failed. Check your Django server logs.");
        console.error("Backend error:", backendResponse.statusText);
      }
    } catch (error) {
      console.error("Failed to connect to backend:", error);
      setMessage("Failed to connect to backend. Is your Django server running?");
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSendingEmail(true);
    setMessage('');

    try {
      const response = await fetch(`${backendBaseUrl}auth/email/send/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsEmailSent(true);
        setMessage("Success! Please check your email for a login link.");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to send magic link.'}`);
      }
    } catch (error) {
      setMessage("Failed to connect to backend. Is your Django server running?");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setMessage("Logged out.");
  };

  return (
    <>
    <Navbar />
      

      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative z-10">
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-300">
          <h1 className="text-3xl font-bold text-center text-white mb-6">User Dashboard</h1>

          {message && (
            <div className="mb-4 text-center p-3 rounded-lg text-sm font-medium bg-indigo-200 text-indigo-900">
              {message}
            </div>
          )}

          {isAuthenticated ? (
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-2xl font-semibold text-indigo-200">Welcome, {userProfile?.name}!</h2>
              <p className="text-indigo-400">You are successfully authenticated.</p>

              <div className="w-full text-left bg-gray-800 p-4 rounded-lg space-y-2">
                <h3 className="text-lg font-medium text-white">Your Profile</h3>
                <p className="text-indigo-300 font-mono text-sm">Email: {userProfile?.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200">
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center space-y-6">
              <p className="text-indigo-300">
                Sign in with your Google account or by email.
              </p>

              <div className="w-full flex justify-center">
                <div id="google-signin-button"></div>
              </div>

              <div className="w-full relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-500"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-indigo-400">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isSendingEmail || isEmailSent}
                  required
                />
                <button
                  type="submit"
                  className={`w-full font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 ${
                    isSendingEmail || isEmailSent
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-500 text-white hover:bg-indigo-600'
                  }`}
                  disabled={isSendingEmail || isEmailSent}
                >
                  {isSendingEmail ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FooterPage from "../components/Footer";
import RecommendedDomain from "./Recommended";

const QuizDashboard = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/scores");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p>Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p>Error fetching data: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen px-4 pt-24 pb-10">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Quiz Dashboard</h1>
          {results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2">Domain</th>
                    <th className="p-2">Score</th>
                    <th className="p-2">Total Questions</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, index) => (
                    <tr key={r.id || index} className="border-b border-gray-700">
                      <td className="p-2">{r.domain}</td>
                      <td className="p-2">{r.score}</td>
                      <td className="p-2">{r.total}</td>
                      <td className="p-2">{r.date_taken}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400">No quiz results found.</p>
          )}
        </div>
      </div>
      <RecommendedDomain />
      <FooterPage />
    </>
  );
};

export default QuizDashboard;

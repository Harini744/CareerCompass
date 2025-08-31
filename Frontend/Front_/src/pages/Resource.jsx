import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ResourcePage() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigate

  const popularDomains = [
    "Web Development",
    "Data Science",
    "Cybersecurity",
    "UIUX Design",
    "Cloud Computing",
    "DevOps",
    "AI Engineering",
    "Mobile App Development",
    "Software Testing",
    "Game Development"
  ];

  const handleGenerate = async () => {
    if (!domain) return;
    setLoading(true);
    setData(null);

    try {
      const response = await fetch(
        `http://localhost:8000/api/resources/${encodeURIComponent(domain)}/`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({ error: "Something went wrong. Please check your backend server." });
    }

    setLoading(false);
  };

  const handleTakeQuiz = () => {
    if (!domain) return alert("Please enter or select a domain first.");
    navigate(`/quizz?domain=${encodeURIComponent(domain)}`); // ✅ Navigate to QuizPage with domain
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans transition-colors duration-500">
      <Navbar />

      <main className="flex-grow pt-24 pb-8 px-4 max-w-2xl mx-auto w-full">
        <h2 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Career Compass
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter a tech domain (e.g., Web Development)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-4 border border-gray-700 rounded-xl bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-lg"
          />

          {/* Popular Domains Section */}
          <div className="mb-4">
            <h4 className="text-md font-semibold mb-3 text-gray-400">Popular Domains</h4>
            <div className="flex flex-wrap gap-3">
              {popularDomains.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => setDomain(d)}
                  className="bg-gray-800 hover:bg-gray-700 text-sm text-gray-200 px-4 py-2 rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-md transform hover:-translate-y-1"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 transform ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Generating..." : "Get Career Guide"}
          </button>
        </div>

        {/* Display Data */}
        {data && (
          <div className="mt-8 space-y-8 animate-fade-in-up">
            {data.error ? (
              <p className="text-red-400 text-center font-semibold text-lg">{data.error}</p>
            ) : (
              <>
                <Section title="Summary" items={[data.summary]} />
                <Section title="Career Roadmap" items={data.roadmap} />
                <Section title="Project Ideas" items={data.project_ideas} />
                <Section title="Key Skills" items={data.key_skills} />
                <Section title="Learning Resources" items={data.learning_resources} />
              </>
            )}
          </div>
        )}

        {/* ✅ Take Quiz Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleTakeQuiz}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Take Quiz
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, items }) {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    if (items) setIsVisible(true);
  }, [items]);

  return (
    <div className={`p-6 bg-gray-900 rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-[1.01] ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <h3 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2 text-blue-400">{title}</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        {items?.map((item, idx) => (
          <li key={idx} className="transition-all duration-500 hover:text-white">
            {typeof item === 'object' ? `${item.type}: ${item.name}` : item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourcePage;

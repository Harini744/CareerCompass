import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterPage from "../components/Footer";

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get domain from query params
  const queryParams = new URLSearchParams(location.search);
  const domain = queryParams.get("domain");

  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch quiz from backend on mount
  useEffect(() => {
    if (!domain) {
      navigate("/resources");
      return;
    }

    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/generate-quiz/", {
          domain,
        });
        setQuiz(res.data.quiz);
        setCurrentQuestion(0);
        setScore(0);
        setIsQuizFinished(false);
      } catch (err) {
        console.error(err);
        alert("Failed to generate quiz. Please try again.");
        navigate("/resources");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [domain, navigate]);

  // ✅ Submit result to backend
const submitResult = async () => {
  try {
    await axios.post("http://127.0.0.1:8000/api/submit-quiz/", {
      domain,
      score,
      total: quiz.length,
    });
  } catch (err) {
    console.error("Failed to save quiz result:", err);
  }
};


  const handleAnswer = (option) => {
    if (selectedOption) return;

    setSelectedOption(option);

    const correctAnswer = quiz[currentQuestion].answer;
    if (option === correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question after 1 second
    setTimeout(() => {
      if (currentQuestion + 1 < quiz.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setIsQuizFinished(true);
        submitResult(); // Save result when quiz finishes
      }
    }, 1000);
  };

  const getOptionClass = (option) => {
    if (!selectedOption) return "bg-gray-700 hover:bg-gray-600 text-white";
    const correctAnswer = quiz[currentQuestion].answer;
    if (option === selectedOption) {
      return option === correctAnswer
        ? "bg-green-600 text-white"
        : "bg-red-600 text-white";
    } else if (option === correctAnswer) {
      return "bg-green-600 text-white"; // show correct answer
    } else {
      return "bg-gray-700 text-white";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Quiz: {domain}</h1>

        {loading && <p>Loading quiz...</p>}

        {!loading && quiz.length > 0 && !isQuizFinished && (
          <div className="w-full max-w-xl mt-6 p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1} / {quiz.length}
            </h2>
            <p className="mb-4 text-blue-400">{quiz[currentQuestion].question}</p>
            <div className="flex flex-col space-y-2">
              {quiz[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={`px-4 py-2 rounded-lg transition-colors ${getOptionClass(option)}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {isQuizFinished && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Quiz Finished!</h2>
            <p className="text-lg mb-4">
              Your Score: {score} / {quiz.length}
            </p>
            <button
              onClick={() => navigate(`/resources`)}
              className="px-6 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
            >
              Back to Resource
            </button>
          </div>
        )}
      </div>
      <FooterPage />
    </>
  );
};

export default QuizPage;

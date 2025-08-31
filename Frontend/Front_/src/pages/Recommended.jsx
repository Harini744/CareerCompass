import React, { useEffect, useState } from 'react';

// This component uses a simplified collaborative filtering algorithm
// with hardcoded data to recommend a domain.
const RecommendedDomain = () => {
  const [recommended, setRecommended] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded data to simulate user quiz scores from a database.
  const allUserData = {
    // Current user's scores
    'user-A': [
      { domain: 'Python', score: 8, totalQuestions: 10 },
      { domain: 'Web Development', score: 9, totalQuestions: 10 },
      { domain: 'AI Engineer', score: 5, totalQuestions: 10 },
    ],
    // Other users' scores
    'user-B': [
      { domain: 'Python', score: 9, totalQuestions: 10 },
      { domain: 'Web Development', score: 8, totalQuestions: 10 },
      { domain: 'Data Science', score: 9, totalQuestions: 10 },
    ],
    'user-C': [
      { domain: 'Python Basics', score: 8, totalQuestions: 10 },
      { domain: 'AI Engineer', score: 7, totalQuestions: 10 },
      { domain: 'Data Science', score: 8, totalQuestions: 10 },
    ],
  };

  // The ID for the current user we want a recommendation for.
  const currentUserId = 'user-A';

  useEffect(() => {
    const fetchRecommendations = () => {
      // Step 1: Normalize scores for all users
      const normalizedScores = {};
      for (const userId in allUserData) {
        normalizedScores[userId] = {};
        allUserData[userId].forEach(item => {
          normalizedScores[userId][item.domain] = item.score / item.totalQuestions;
        });
      }

      const currentUserScores = normalizedScores[currentUserId];

      if (!currentUserScores) {
        setLoading(false);
        return;
      }

      // Step 2: Find the most similar user
      let mostSimilarUser = null;
      let highestSimilarity = -1;

      for (const otherUserId in normalizedScores) {
        if (otherUserId === currentUserId) continue;

        const otherUserScores = normalizedScores[otherUserId];
        let similarity = 0;
        let commonDomainsCount = 0;

        // Calculate a simple similarity metric based on shared domains.
        for (const domain in currentUserScores) {
          if (otherUserScores[domain] !== undefined) {
            // Inverse of the squared difference
            similarity += 1 / (1 + Math.pow(currentUserScores[domain] - otherUserScores[domain], 2));
            commonDomainsCount++;
          }
        }

        // Normalize similarity by the number of common domains
        if (commonDomainsCount > 0) {
          similarity /= commonDomainsCount;
        }

        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          mostSimilarUser = otherUserId;
        }
      }

      // Step 3: Recommend a domain from the most similar user
      if (mostSimilarUser && highestSimilarity > 0) {
        const similarUserScores = normalizedScores[mostSimilarUser];
        let bestRecommendation = null;
        let bestScore = -1;

        for (const domain in similarUserScores) {
          // Recommend a domain the current user hasn't taken
          if (currentUserScores[domain] === undefined) {
            if (similarUserScores[domain] > bestScore) {
              bestScore = similarUserScores[domain];
              bestRecommendation = domain;
            }
          }
        }

        if (bestRecommendation) {
          setRecommended({ domain: bestRecommendation });
        }
      }

      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray flex flex-col items-center justify-center">
        <script src="https://cdn.tailwindcss.com"></script>
        <div className="text-center p-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
          <p className="text-gray-400">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  if (!recommended) {
    return (
      <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
        <script src="https://cdn.tailwindcss.com"></script>
        <div className="text-center p-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
          <p className="text-gray-400">No recommendation available. Add more users or scores to the hardcoded data!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center ">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="text-center p-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-2 text-white">Recommended for you:</h3>
        <p className="text-lg text-purple-400 font-semibold mb-4">{recommended.domain}</p>
        <p className="text-sm text-gray-400">Based on what users similar to you have enjoyed.</p>
      </div>
    </div>
  );
};

export default RecommendedDomain;

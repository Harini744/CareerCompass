// src/api/gemini.js
export const fetchGeminiResponse = async (query) => {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: query }] }]
    })
  });

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
};

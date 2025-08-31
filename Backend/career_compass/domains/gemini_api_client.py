import os
import json
import google.generativeai as genai
from flask import Flask, jsonify, request
from flask_cors import CORS

# ----------------- Configuration -----------------
API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyCvqAt9xPfULslvZ_hs3D2UeBu_V1OR8GI")
genai.configure(api_key=API_KEY)

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

# ----------------- Resource Generation -----------------
def generate_it_resources(domain: str) -> dict:
    """
    Generates a comprehensive IT career roadmap, project ideas, key skills,
    and learning resources for a given domain using Gemini API.
    """
    user_prompt = f"""
    You are an expert IT career advisor. Your task is to provide comprehensive, actionable advice for a specific IT career domain.

    For the domain '{domain}', generate the following:
    1. A brief summary of the domain.
    2. A detailed career roadmap.
    3. Relevant project ideas.
    4. A list of key skills.
    5. Suggested learning resources.

    Format your response as a JSON object with the following keys: 'summary', 'roadmap', 'project_ideas', 'key_skills', and 'learning_resources'. The values for 'summary' should be a single string, and the others should be a list of strings.
    """

    try:
        response = model.generate_content(
            contents=[{"role": "user", "parts": [{"text": user_prompt}]}],
            generation_config={"response_mime_type": "application/json"}
        )

        if response and response.candidates and response.candidates[0].content:
            generated_text = response.candidates[0].content.parts[0].text
            return json.loads(generated_text)
        else:
            return {"error": "Failed to generate resources."}
    except Exception as e:
        return {"error": str(e)}

# ----------------- Quiz Generation -----------------
def generate_quiz_from_gemini(domain: str):
    """
    Calls Gemini API to generate 10 MCQs for the given IT domain.
    Returns a list of dictionaries: 
    [{ "question": "", "options": [], "answer": "" }, ...]
    """
    prompt = f"""
    Generate 10 multiple-choice questions for the IT domain '{domain}'.
    Each question should have 4 options. Provide the correct answer explicitly.
    Return data as a JSON array:
    [
        {{
            "question": "Question text",
            "options": ["Option1", "Option2", "Option3", "Option4"],
            "answer": "CorrectOption"
        }},
        ...
    ]
    """

    try:
        response = model.generate_content(
            contents=[{"role": "user", "parts": [{"text": prompt}]}],
            generation_config={"response_mime_type": "application/json"}
        )

        if response and response.candidates and response.candidates[0].content:
            quiz_text = response.candidates[0].content.parts[0].text
            return json.loads(quiz_text)
        else:
            return {"error": "Failed to generate quiz."}
    except Exception as e:
        return {"error": str(e)}

# ----------------- API Routes -----------------
@app.route('/api/resources/<domain>', methods=['GET'])
def get_it_resources(domain):
    """
    API endpoint to get IT career resources for a specific domain.
    """
    data = generate_it_resources(domain)
    return jsonify(data)

@app.route('/api/generate-quiz', methods=['POST'])
def get_quiz():
    """
    API endpoint to generate 10 MCQs for a domain.
    Expects JSON body: { "domain": "AI Engineering" }
    """
    try:
        body = request.get_json()
        domain = body.get("domain")
        if not domain:
            return jsonify({"error": "Domain is required"}), 400

        quiz_data = generate_quiz_from_gemini(domain)
        return jsonify({"quiz": quiz_data})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----------------- Run Server -----------------
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)

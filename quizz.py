import streamlit as st
import json
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get Gemini API key from environment variable
API_KEY = os.environ.get('GEMINI_API_KEY', '')

# --- Define the App's Structure and State ---
def initialize_session_state():
    if 'quiz' not in st.session_state:
        st.session_state.quiz = []
    if 'current_question' not in st.session_state:
        st.session_state.current_question = 0
    if 'player_score' not in st.session_state:
        st.session_state.player_score = 0
    if 'user_answers' not in st.session_state:
        st.session_state.user_answers = []
    if 'quiz_finished' not in st.session_state:
        st.session_state.quiz_finished = False

def generate_quiz(topic, num_questions):
    quiz = []

    json_schema = {
        "type": "ARRAY",
        "items": {
            "type": "OBJECT",
            "properties": {
                "question": {"type": "STRING"},
                "options": {
                    "type": "ARRAY",
                    "items": {"type": "STRING"}
                },
                "correct_answer_index": {"type": "NUMBER"}
            },
            "propertyOrdering": ["question", "options", "correct_answer_index"]
        }
    }

    prompt = f"Create a multiple choice quiz with {num_questions} questions about {topic}. For each question, provide four options and the index of the correct answer (0, 1, 2, or 3)."

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseSchema": json_schema,
        }
    }

    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key={API_KEY}"

    try:
        response = requests.post(api_url, json=payload)
        response.raise_for_status()

        result = response.json()
        raw_json_string = result['candidates'][0]['content']['parts'][0]['text']
        quiz = json.loads(raw_json_string)
        return quiz

    except requests.exceptions.RequestException as e:
        st.error(f"Failed to generate quiz: {e}")
        return []
    except (KeyError, IndexError, json.JSONDecodeError) as e:
        st.error(f"Failed to parse API response. Please try again. Error: {e}")
        return []

def display_question(question_idx):
    question_data = st.session_state.quiz[question_idx]
    st.markdown(f"**Question {question_idx + 1}:** {question_data['question']}")
    selected_option = st.radio(
        "Select your answer:",
        question_data['options'],
        index=None,
        key=f"question_radio_{question_idx}"
    )
    if selected_option:
        return question_data['options'].index(selected_option)
    return None

def main_app():
    st.set_page_config(page_title="IT Career Quiz", layout="centered")
    st.title("IT Career Path Quiz")
    st.write("This application helps you explore different IT domains. Select a domain below, and a custom quiz will be generated for you!")
    st.divider()

    domains = {
        "Software Development": "...",
        "Cybersecurity": "...",
        "Machine Learning": "...",
        "IoT Developers": "...",
        "Marketing Designer": "...",
        "Management Consultant": "...",
        "Data Science": "...",
        "Cloud Computing": "...",
        "DevOps": "...",
        "AI Engineering": "...",
        "Game Development": "...",
        "UI/UX Design": "...",
        "Database Administration": "...",
        "Network Engineering": "...",
        "Business Intelligence": "...",
        "Quality Assurance (QA)": "...",
        "Mobile Development": "...",
        "Systems Analysis": "...",
        "Site Reliability Engineering (SRE)": "...",
        "IT Project Management": "...",
    }

    selected_domain = st.selectbox("Choose a domain to get started:", options=[""] + list(domains.keys()), index=0)

    if selected_domain:
        st.info(f"You have selected **{selected_domain}**: {domains[selected_domain]}")

    num_questions = 10

    if st.button('Generate Quiz', use_container_width=True):
        if selected_domain:
            with st.spinner(f"Generating a {num_questions}-question quiz on {selected_domain}..."):
                st.session_state.quiz = generate_quiz(selected_domain, num_questions)
                st.session_state.current_question = 0
                st.session_state.player_score = 0
                st.session_state.user_answers = [None] * len(st.session_state.quiz)
                st.session_state.quiz_finished = False
        else:
            st.error("Please select a domain before generating the quiz.")

    st.divider()

    if st.session_state.quiz and not st.session_state.quiz_finished:
        st.subheader(f"Quiz on {selected_domain}")
        selected_option_index = display_question(st.session_state.current_question)

        col1, col2 = st.columns(2)
        with col1:
            if st.button("Save Answer and Next Question"):
                if selected_option_index is not None:
                    correct_index = st.session_state.quiz[st.session_state.current_question]['correct_answer_index']
                    if selected_option_index == correct_index:
                        st.session_state.player_score += 1
                    st.session_state.user_answers[st.session_state.current_question] = selected_option_index
                    if st.session_state.current_question < len(st.session_state.quiz) - 1:
                        st.session_state.current_question += 1
                        st.rerun()
                    else:
                        st.session_state.quiz_finished = True
                        st.rerun()
                else:
                    st.warning("Please select an answer before proceeding.")

    if st.session_state.quiz_finished:
        st.success("🎉 Quiz Finished!")
        st.subheader(f"Your Score: {st.session_state.player_score}/{len(st.session_state.quiz)}")
        st.write("Here are the results:")

        for i, question_data in enumerate(st.session_state.quiz):
            user_answer_index = st.session_state.user_answers[i]
            correct_answer_index = question_data['correct_answer_index']
            is_correct = (user_answer_index == correct_answer_index)

            with st.expander(f"Question {i + 1}: {'✅ Correct' if is_correct else '❌ Incorrect'}"):
                st.write(f"**Question:** {question_data['question']}")
                for j, option in enumerate(question_data['options']):
                    if j == correct_answer_index:
                        st.write(f"**✅ Correct Answer:** {option}")
                    elif j == user_answer_index:
                        st.write(f"**❌ Your Answer:** {option}")
                    else:
                        st.write(f"**-** {option}")

if __name__ == "__main__":
    initialize_session_state()
    main_app()

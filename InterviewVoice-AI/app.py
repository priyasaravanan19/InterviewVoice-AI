from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

questions = {
    "HR Interview": [
        "Tell me about yourself.",
        "What are your strengths and weaknesses?",
        "Why should we hire you?",
        "Where do you see yourself in five years?",
        "Why do you want to join our company?"
    ],

    "Technical Interview": [
        "What is object-oriented programming?",
        "What is the difference between frontend and backend development?",
        "What is a database?",
        "What is an API?",
        "Explain the difference between SQL and NoSQL databases."
    ],

    "General Interview": [
        "Tell me about yourself.",
        "What is your biggest achievement?",
        "How do you handle pressure?",
        "What motivates you?",
        "What are your career goals?"
    ]
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/questions/<category>")
def get_questions(category):
    if category not in questions:
        return jsonify({"error": "Invalid category"}), 400

    return jsonify({
        "questions": questions[category]
    })


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    answer = data.get("answer", "").strip()
    question = data.get("question", "")

    if not answer:
        return jsonify({
            "score": 0,
            "relevance": 0,
            "communication": 0,
            "completeness": 0,
            "feedback": "Please provide an answer."
        })

    words = answer.split()
    word_count = len(words)

    # Basic scoring
    completeness = min(100, word_count * 4)

    communication = 60

    filler_words = [
        "umm",
        "uh",
        "like",
        "you know",
        "actually"
    ]

    lower_answer = answer.lower()

    filler_count = sum(
        lower_answer.count(word)
        for word in filler_words
    )

    communication -= filler_count * 5
    communication = max(30, min(100, communication))

    # Keyword relevance
    question_words = set(
        question.lower()
        .replace("?", "")
        .split()
    )

    answer_words = set(
        lower_answer
        .replace(".", "")
        .replace(",", "")
        .split()
    )

    common_words = question_words.intersection(answer_words)

    if len(common_words) >= 3:
        relevance = 90
    elif len(common_words) >= 2:
        relevance = 75
    elif len(common_words) >= 1:
        relevance = 60
    else:
        relevance = 45

    score = round(
        (relevance + communication + completeness) / 3
    )

    if score >= 85:
        feedback = "Excellent answer! Your response is clear and relevant."
    elif score >= 70:
        feedback = "Good answer. Try adding more specific examples."
    elif score >= 50:
        feedback = "Your answer is okay, but it could be more detailed."
    else:
        feedback = "Try giving a longer and more structured answer."

    return jsonify({
        "score": score,
        "relevance": relevance,
        "communication": communication,
        "completeness": completeness,
        "feedback": feedback,
        "word_count": word_count
    })


if __name__ == "__main__":
    app.run(debug=True)
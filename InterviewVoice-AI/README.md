# 🎤 InterviewVoice AI

InterviewVoice AI is a web-based AI interview practice application that helps users prepare for HR, technical, and general interviews using voice interaction.

The application asks interview questions, reads questions aloud, converts spoken answers into text, analyzes the answers, and provides performance scores and feedback.

## 🚀 Features

- 🎯 HR, Technical, and General interview categories
- 🔊 Text-to-Speech for interview questions
- 🎙️ Speech-to-Text for user answers
- 📊 AI-style answer scoring
- 📈 Relevance, communication, and completeness scores
- 💡 Personalized interview feedback
- 🏆 Final interview performance report
- 📱 Responsive design
- ✨ Clean and modern user interface

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Web Speech API

### Backend
- Python
- Flask

### AI / Analysis
- Rule-based answer analysis
- Keyword relevance analysis
- Answer length and communication analysis

## 📂 Project Structure

```text
InterviewVoice-AI/
│
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── venv/
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/InterviewVoice-AI.git
```

### 2. Open the project

```bash
cd InterviewVoice-AI
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

#### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

## ▶️ Run the Application

```bash
python app.py
```

Open your browser and visit:

```text
http://127.0.0.1:5000
```

## 🎙️ Voice Features

InterviewVoice AI uses the browser's Web Speech API.

The application provides:

- Speech recognition for answering questions
- Text-to-speech for reading questions
- Microphone-based interaction

For the best experience, use Google Chrome or Microsoft Edge and allow microphone access.

## 📊 Interview Analysis

The application evaluates answers using:

- Answer length
- Question-answer keyword relevance
- Communication indicators
- Completeness

The final score combines these metrics to provide an overall interview score.

## 🎯 Interview Categories

### HR Interview
Includes questions about:

- Introduction
- Strengths and weaknesses
- Career goals
- Company motivation
- Hiring suitability

### Technical Interview
Includes questions about:

- Programming
- APIs
- Databases
- Frontend and backend development
- SQL and NoSQL

### General Interview
Includes common interview questions related to:

- Achievements
- Motivation
- Pressure handling
- Career goals

## 🔮 Future Improvements

- User authentication
- Interview history
- Database integration
- Resume-based interview questions
- Advanced NLP answer evaluation
- AI-generated questions
- Emotion and confidence analysis
- Detailed performance analytics
- Interview difficulty selection
- PDF interview reports
- Multiple languages
- Personalized improvement plans

## 👩‍💻 Author

**Priya Saravanan**

## 📄 License

This project is created for educational and portfolio purposes.
let selectedCategory = "HR Interview";

let questions = [];

let currentQuestion = 0;

let scores = [];

let recognition = null;

let isListening = false;


// Select category

function selectCategory(category, button) {

    selectedCategory = category;

    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
}


// Start interview

async function startInterview() {

    const response = await fetch(
        `/questions/${encodeURIComponent(selectedCategory)}`
    );

    const data = await response.json();

    questions = data.questions;

    currentQuestion = 0;

    scores = [];

    document.getElementById("setupSection")
        .classList.add("hidden");

    document.getElementById("interviewSection")
        .classList.remove("hidden");

    document.getElementById("resultSection")
        .classList.add("hidden");

    document.getElementById("categoryName")
        .textContent = selectedCategory;

    showQuestion();
}


// Show question

function showQuestion() {

    const question = questions[currentQuestion];

    document.getElementById("questionNumber")
        .textContent = currentQuestion + 1;

    document.getElementById("questionText")
        .textContent = question;

    document.getElementById("progressText")
        .textContent =
        `${currentQuestion + 1} / ${questions.length}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressBar")
        .style.width = progress + "%";

    document.getElementById("answerText")
        .value = "";

    document.getElementById("feedbackBox")
        .classList.add("hidden");

    speakQuestion();
}


// Text to speech

function speakQuestion() {

    const question =
        document.getElementById("questionText").textContent;

    if ("speechSynthesis" in window) {

        speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(question);

        speech.rate = 0.9;

        speech.pitch = 1;

        speech.volume = 1;

        speechSynthesis.speak(speech);
    }
}


// Speech recognition

function startListening() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
        );

        return;
    }


    if (isListening) {

        recognition.stop();

        return;
    }


    recognition = new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.continuous = true;

    recognition.interimResults = true;


    recognition.onstart = function() {

        isListening = true;

        document.getElementById("micText")
            .textContent = "Stop Speaking";

        document.getElementById("listeningStatus")
            .textContent = "🔴 Listening...";
    };


    recognition.onresult = function(event) {

        let finalText = "";

        for (
            let i = event.resultIndex; i < event.results.length; i++
        ) {

            finalText +=
                event.results[i][0].transcript;
        }

        document.getElementById("answerText")
            .value = finalText;
    };


    recognition.onerror = function(event) {

        console.log("Speech recognition error:", event.error);

        document.getElementById("listeningStatus")
            .textContent = "Microphone error. Try again.";
    };


    recognition.onend = function() {

        isListening = false;

        document.getElementById("micText")
            .textContent = "Start Speaking";

        document.getElementById("listeningStatus")
            .textContent = "";
    };


    recognition.start();
}


// Clear answer

function clearAnswer() {

    document.getElementById("answerText")
        .value = "";
}


// Submit answer

async function submitAnswer() {

    const answer =
        document.getElementById("answerText")
        .value.trim();

    if (!answer) {

        alert("Please provide an answer first.");

        return;
    }


    const question =
        questions[currentQuestion];


    const response = await fetch("/analyze", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            question: question,
            answer: answer
        })
    });


    const result = await response.json();


    scores.push(result.score);


    document.getElementById("scoreValue")
        .textContent = result.score;

    document.getElementById("relevanceValue")
        .textContent = result.relevance;

    document.getElementById("communicationValue")
        .textContent = result.communication;

    document.getElementById("completenessValue")
        .textContent = result.completeness;

    document.getElementById("feedbackText")
        .textContent = result.feedback;


    document.getElementById("feedbackBox")
        .classList.remove("hidden");
}


// Next question

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        showResults();

        return;
    }

    showQuestion();
}


// Show results

function showResults() {

    document.getElementById("interviewSection")
        .classList.add("hidden");

    document.getElementById("resultSection")
        .classList.remove("hidden");


    const total =
        scores.reduce((sum, score) => sum + score, 0);

    const average =
        scores.length > 0 ?
        Math.round(total / scores.length) :
        0;


    document.getElementById("finalScore")
        .textContent = average;

    document.getElementById("averageScore")
        .textContent = average;

    document.getElementById("answeredQuestions")
        .textContent = scores.length;


    let recommendation = "";

    if (average >= 85) {

        recommendation =
            "Excellent performance! You demonstrate strong communication and interview skills.";

    } else if (average >= 70) {

        recommendation =
            "Good performance! Practice giving more specific examples to make your answers stronger.";

    } else if (average >= 50) {

        recommendation =
            "You're making progress. Try giving longer, more structured answers.";

    } else {

        recommendation =
            "Keep practicing. Focus on answering clearly and confidently.";

    }


    document.getElementById("recommendationText")
        .textContent = recommendation;
}


// Restart

function restartInterview() {

    document.getElementById("resultSection")
        .classList.add("hidden");

    document.getElementById("setupSection")
        .classList.remove("hidden");

    questions = [];

    scores = [];

    currentQuestion = 0;
}
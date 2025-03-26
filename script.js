// Quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        answer: "Oxygen"
    },
    {
        question: "In which year did World War II end?",
        options: ["1943", "1945", "1947", "1950"],
        answer: "1945"
    },
    {
        question: "What is the tallest mammal?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"],
        answer: "Giraffe"
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        answer: "Australia"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Won", "Yen", "Ringgit"],
        answer: "Yen"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare"
    }
];

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const resultsScreen = document.getElementById('results');
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');
const resultMessage = document.getElementById('result-message');

// Quiz variables
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);
let timeLeft = 150; // 2.5 minutes (150 seconds)
let timer;

// Start quiz
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    startScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    displayQuestion();
    startTimer();
}

function restartQuiz() {
    resultsScreen.style.display = 'none';
    startScreen.style.display = 'block';
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(questions.length).fill(null);
    timeLeft = 150;
    timeDisplay.textContent = '02:30';
}

function displayQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestion];
    let optionsHtml = '';

    question.options.forEach((option, index) => {
        optionsHtml += `
            <div class="option">
                <input type="radio" 
                       id="option${index}" 
                       name="question${currentQuestion}" 
                       value="${option}"
                       ${userAnswers[currentQuestion] === option ? 'checked' : ''}>
                <label for="option${index}">${option}</label>
            </div>
        `;
    });

    questionContainer.innerHTML = `
        <div class="question">
            <h3>Question ${currentQuestion + 1}: ${question.question}</h3>
            <div class="options">
                ${optionsHtml}
            </div>
        </div>
    `;

    // Add event listeners to radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            userAnswers[currentQuestion] = e.target.value;
        });
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

submitBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    resultsScreen.style.display = 'block';

    // Calculate score
    score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }

    // Display results
    scoreDisplay.textContent = score;
    
    // Result message based on score
    if (score === questions.length) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (score >= questions.length * 0.8) {
        resultMessage.textContent = "Excellent! You know your stuff!";
    } else if (score >= questions.length * 0.6) {
        resultMessage.textContent = "Good job! You passed!";
    } else if (score >= questions.length * 0.4) {
        resultMessage.textContent = "Not bad, but you could do better!";
    } else {
        resultMessage.textContent = "Keep studying! You'll do better next time!";
    }
}
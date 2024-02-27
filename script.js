// JavaScript code for your quiz game
let questions = []; // Array to store the loaded questions
let currentQuestionIndex = 0;
let score = 0;
let answered = false; // Variable to track whether the user has answered the current question

const questionContainer = document.getElementById('question-container');
const answersContainer = document.getElementById('answers-container');
const nextButton = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score-value');
const feedbackDisplay = document.getElementById('feedback');

// Function to load questions from JSON file
function loadQuestions() {
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      questions = data;
      displayQuestion();
    })
    .catch(error => console.error('Error loading questions:', error));
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;

  // Clear previous answers
  answersContainer.innerHTML = '';

  // Display answers
  currentQuestion.answers.forEach(answer => {
    const answerBtn = document.createElement('button');
    answerBtn.classList.add('answer-btn');
    answerBtn.textContent = answer;
    answerBtn.addEventListener('click', () => {
      if (!answered) {
        checkAnswer(answer, answerBtn);
        lockAnswers();
      }
    });
    answersContainer.appendChild(answerBtn);
  });
}

function checkAnswer(selectedAnswer, selectedButton) {
  answered = true;
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
    scoreDisplay.textContent = score;
    feedbackDisplay.textContent = 'Correct!';
    selectedButton.style.backgroundColor = '#28a745'; // Green for correct answer
  } else {
    feedbackDisplay.textContent = 'Incorrect!';
    selectedButton.style.backgroundColor = '#dc3545'; // Red for incorrect answer
    // Highlight the correct answer button
    const correctAnswerIndex = currentQuestion.answers.indexOf(currentQuestion.correctAnswer);
    answersContainer.children[correctAnswerIndex].style.backgroundColor = '#28a745';
  }

  // Change colors of other answer buttons
  const answerButtons = document.querySelectorAll('.answer-btn');
  answerButtons.forEach(button => {
    if (button !== selectedButton) {
      button.style.backgroundColor = '#6c757d'; // Gray shade
    }
  });
}

function lockAnswers() {
  const answerButtons = document.querySelectorAll('.answer-btn');
  answerButtons.forEach(button => {
    button.disabled = true;
    button.style.cursor = 'not-allowed';
  });
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    answered = false; // Reset answered flag for the next question
    feedbackDisplay.textContent = ''; // Clear feedback message
    displayQuestion();
  } else {
    alert('Quiz completed! Your final score is: ' + score);
  }
});

// Load questions when the page is loaded
window.addEventListener('load', loadQuestions);

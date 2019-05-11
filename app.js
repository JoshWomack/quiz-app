const QUESTIONS = [
  {
    question: "What number am I thinking of?",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "3"
  },
  {
    question: "What number am I thinking of?",
    answers: ["1", "8", "444", "500"],
    correctAnswer: "8"
  },
  {
    question: "What number am I thinking of?",
    answers: ["999", "66", "19", "2"],
    correctAnswer: "999"
  },
  {
    question: "What number am I thinking of?",
    answers: ["2", "4", "6", "8"],
    correctAnswer: "6"
  },
  {
    question: "What number am I thinking of?",
    answers: ["88", "349", "34", "2938"],
    correctAnswer: "2938"
  }
];

const STATE = {
  render: {
    startPage: true,
    questionPage: false,
    resultsPage: false
  },

  currentQuestion: 0,
  currentScore: 0
};

function render() {
  console.log("render called");
  if (STATE.render.startPage) {
    renderStartPage();
  } else if (STATE.render.questionPage) {
    renderQuestionPage();
  } else if (STATE.render.resultsPage) {
    renderResultsPage();
  }
}

// Page render functions
function renderStartPage() {
  STARTPAGE.classList.remove("js-hide-page");
  QUESTIONPAGE.classList.add("js-hide-page");
  RESULTSPAGE.classList.add("js-hide-page");
}
function renderQuestionPage() {
  console.log("render question called");
  STARTPAGE.classList.add("js-hide-page");
  QUESTIONPAGE.classList.remove("js-hide-page");
  RESULTSPAGE.classList.add("js-hide-page");
  QUESTIONFORM.innerHTML = `
  ${renderCurrentQuestion(QUESTIONS[STATE.currentQuestion])}
  <button type="submit" class="js-answer-submit">Submit Answer</button>
  `;
  CURRENTSCOREP.textContent = `Current Question: ${STATE.currentQuestion +
    1} out of ${QUESTIONS.length} -- Current score: ${STATE.currentScore}`;
}
function renderResultsPage() {
  STARTPAGE.classList.add("js-hide-page");
  QUESTIONPAGE.classList.add("js-hide-page");
  RESULTSPAGE.classList.remove("js-hide-page");
  RESULTSPAGEP.textContent = `You got ${STATE.currentScore} questions correct.`;
}

function renderCurrentQuestion(question) {
  const answers = question.answers
    .map((answer, index) => {
      console.log(answer);
      return `
        <input type = "radio" name = "answers" id=${index} value=${answer} />
        <label for="answers">${answer}</label>
        `;
    })
    .join("");
  return `
  <p>${question.question}</p>
  ${answers}
  `;
}

// DOM elements
const STARTPAGE = document.querySelector(".js-start-page");
const QUESTIONPAGE = document.querySelector(".js-question-page");
const RESULTSPAGE = document.querySelector(".js-results-page");
const STARTQUIZBUTTON = document.querySelector("#js-start-quiz-button");
const FINISHQUIZBUTTON = document.querySelector("#js-finish-quiz-button");
const RESTARTQUIZBUTTON = document.querySelector("#js-restart-quiz-button");
const QUESTIONFORM = document.querySelector("#js-question-form");
const CURRENTSCOREP = document.querySelector("#js-current-score");
const RESULTSPAGEP = document.querySelector("#js-results-page-p");

// Handle starting of the quiz when 'start quiz' button is clicked
function handleStartQuiz() {
  STARTQUIZBUTTON.addEventListener("click", e => {
    // change state render values in order to display questions page
    STATE.render.startPage = false;
    STATE.render.questionPage = true;
    render();
  });
}

function handleFinishQuiz() {
  STATE.render.questionPage = false;
  STATE.render.resultsPage = true;
  render();
}

function handleQuizRestart() {
  RESTARTQUIZBUTTON.addEventListener("click", e => {
    STATE.render.resultsPage = false;
    STATE.render.startPage = true;
    STATE.currentQuestion = 0;
    STATE.currentScore = 0;
    render();
  });
}

function handleQuestionSubmit() {
  QUESTIONFORM.addEventListener("submit", e => {
    e.preventDefault();
    let currentAnswer = QUESTIONFORM.elements["answers"].value;
    checkAnswer(currentAnswer);
    STATE.currentQuestion++;
    if (STATE.currentQuestion === QUESTIONS.length) {
      handleFinishQuiz();
    } else {
      render();
    }
  });
}

function checkAnswer(answer) {
  if (answer === QUESTIONS[STATE.currentQuestion].correctAnswer) {
    STATE.currentScore++;
  }
}
function getCurrentAnswer() {
  return document.querySelector('input[name="answers"]:checked').value;
}

function startApp() {
  // Initial rendering of page
  render();
  // Add event listeners
  handleStartQuiz();
  handleQuestionSubmit();
  handleQuizRestart();
}

startApp();

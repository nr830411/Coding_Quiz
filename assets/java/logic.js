
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
//
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

function startQuiz() {
 //Hiding The Start Screen
  var startScreen = document.querySelector("#start-screen");
  startScreen.setAttribute("class", "hide");

  
  questionsEl.removeAttribute("class");

// Starts Quiz
  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {

  var currentQuestion = questions[currentQuestionIndex];

// update title with current question
var titleEl = document.querySelector("#question-title");
titleEl.textContent = currentQuestion.title;

choicesEl.innerHTML = "";

currentQuestion.choices.forEach(function(choice, i) {

//Creating Question Buttons 
  var choiceNode = document.createElement("button");
  choiceNode.setAttribute("class", "choice");
  choiceNode.setAttribute("value", choice);

  choiceNode.textContent = i + 1 + ". " + choice;

  choiceNode.onclick = questionClick;

  choicesEl.appendChild(choiceNode);
});
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.textContent = time;

    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

//STARTS QUIZ
startBtn.onclick = startQuiz;


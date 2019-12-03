
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
//
var questions = document.querySelector("#questions");
var timer = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

function startQuiz() {
 //Hiding The Start Screen
  var startScreen = document.querySelector("#start-screen");
  startScreen.setAttribute("class", "hide");

  
  questions.removeAttribute("class");

// Starts Quiz
  timerId = setInterval(clockTick, 1000);

  timer.textContent = time;

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




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
  timerId = setInterval(countdown, 1000);

  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {

  var currentQuestion = questions[currentQuestionIndex];

//REPLACES BLANK TITLE WITH CURRENT QUESTION
  var titleEl = document.querySelector("#question-title");
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {

//CREATES QUESTION BUTTONS
  var quesButt = document.createElement("button");
  quesButt.setAttribute("class", "choice");
  quesButt.setAttribute("value", choice);

  quesButt.textContent = i + 1 + ". " + choice;

  quesButt.onclick = questionClick;

  choicesEl.appendChild(quesButt);
});
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";

  } else {
    feedbackEl.textContent = "Correct!";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

 //CHANGES TO NEXT QUESTION
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd () {

  clearInterval(timerId)

  var endScreenEl = document.querySelector("#end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.querySelector("#final-score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");

}

//FUNCTION FOR CLOCK TIME IN CORRESPONDENCE WITH QUESTION ANSWERS
function countdown() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {

  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function enter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}




submitBtn.onclick = saveHighscore;
initialsEl.onkeyup = enter;








//STARTS QUIZ
startBtn.onclick = startQuiz;


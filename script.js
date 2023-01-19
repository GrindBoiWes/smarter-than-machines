
// List of questions and correct answers
var questions = [
    {
        question: "Arrays in Javascript can be used to store ___",
        choices: ["a. Numbers and Strings", "b. Other Arrays", "c. Booleans", "d. All of the Above"],
        answer: "b. Other Arrays"
    },

    {
        question: "Commonly used data types DO NOT include",
        choices: ["a. Strings", "b. Booleans", "c. Alerts", "d. Numbers"],
        answer: "c. Alerts"
    },

    {
        question: "How do you write a comment in Javascript?",
        choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. *This is a comment", "d. 'This is a comment'"],
        answer: "a. //This is a comment"
    },

    {
        question: "The first index of an array is _____",
        choices: ["a. 1", "b. 2", "c. 0", "d. None of the above"],
        answer: "c. 0"
    },

    {
        question: "In javascript, which of the following is a logical operator?",
        choices: ["a. ||", "b. &&", "c. $$", "d. @@"],
        answer: "b. &&"
    },
];
//Dom Elements

var questionsEL = document.querySelector("#questions");
var timerEL = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var restartBtn = document.querySelector("#restart");



//quiz state variables
startBtn.addEventListener('click', startQuiz());

var currentQuestionIndex = 0;
var secondsLeft = 75;
var timerId;

function startQuiz() {
    console.log('start');
    timerId = setInterval(timerInterval, 1000);
    timerEL.textContent = time;
    var beginEl = document.getElementById("start");
    beginEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestions();
}

function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex];
    var questionEl = document.getElementById("questions");
    questionEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);

    })     

};

function setTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEL.textContent = "Time Remaining " + secondsLeft;

        if (secondsLeft === 0){
            clearInterval(timerInterval)
            sendMessage();
        }
    }, 1000)
}

setTimer();








startBtn.onclick = startQuiz;
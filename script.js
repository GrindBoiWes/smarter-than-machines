
// List of questions and correct answers
var questions = [
    {
        title: "Arrays in Javascript can be used to store ___",
        choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        answer: "Other Arrays"
    },

    {
        title: "Commonly used data types DO NOT include",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },

    {
        title: "How do you write a comment in Javascript?",
        choices: ["//This is a comment", "<!--This is a comment-->", " *This is a comment", "'This is a comment'"],
        answer: "//This is a comment"
    },

    {
        title: "The first index of an array is _____",
        choices: ["1", "2", "0", "None of the above"],
        answer: "0"
    },

    {
        title: "In javascript, which of the following is a logical operator?",
        choices: ["||", "&&", "$$", "@@"],
        answer: "&&"
    },
];
//Dom Elements

var currentQuestionIndex = 0;
var secondsLeft = 75;

var quizEl = document.getElementById("quiz");
var timerEl = document.getElementById("timer");
var submitBtn = document.getElementById("submit-score");
var startBtn = document.getElementById("start");
var nameEl = document.getElementById("name");
var feedbackEl = document.getElementById("feedback");
var restartBtn = document.getElementById("restart");
var choicesEl = document.getElementById("choices");
var startQuizEl = document.getElementById("begin-quiz");
//Quiz state variables

function startQuiz() {
    console.log('start');
    //var currentQuestion = questions[currentQuestionIndex];
   // newQuestion.textContent = currentQuestion.title;
   // answerBtn.textContent = questions.choices;
   // newQuestion.innerHTML = title;
    //answerBtn.innerHTML = choices;

    //currentQuestion.choices.forEach(function(choice, i) {
       // var choiceNode = document.createElement("button");
       // choiceNode.classList.add("btn-grid");

    //for (var i = 0; i < questions.length; i++) {
      // newQuestion.textContent =  currentQuestion.questions;
    //  }
    getQuestions()
};

function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex]; 

    var newQuestion = document.getElementById("questions");
    newQuestion.textContent = currentQuestion.title;
    
    choicesEl.innerHTML = "" ;
    
    currentQuestion.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "button");
        choiceBtn.setAttribute("value", choice);

       choiceBtn.textContent = i + 1 + ". " + choice;

       choiceBtn.onclick = questionClick;
       choicesEl.appendChild(choiceBtn);
    })
    
};
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        secondsLeft -= 15;

        if(secondsLeft < 0) {
            secondsLeft = 0;
        }
        timerEl.textContent = secondsLeft;
        feedbackEl.textContent = "Incorrect!"
        feedbackEl.style.color = "maroon";
        feedbackEl.style.fontSize = "250%";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "purple";
        feedbackEl.style.fontSize = "250%";
    }
    currentQuestionIndex++;

    if(currentQuestionIndex = questions.length) {
        quizEnd();
    } else (
        getQuestions()
    )
};
function quizEnd() {
    clearInterval(secondsLeft);
}


function setTimer() {
    var timerEl = document.querySelector("#timer");
    var secondsLeft = questions.length * 15;
        let timerInterval = setInterval(function() {
            secondsLeft--;
            timerEl.textContent = "Time Remaining " + secondsLeft;
    
            if (secondsLeft === 0){
                clearInterval(timerInterval);
            }
        }, 1000)
    };



    startBtn.addEventListener('click', function() {
        quizEl.classList.remove("hide");
        startQuizEl.classList.add("hide");
        setTimer()
       startQuiz()
    });    
    
    
    
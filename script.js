
// List of questions and correct answers
var questions = [
    {
        title: "Arrays in Javascript can be used to store ___",
        choices: ["a. Numbers and Strings", "b. Other Arrays", "c. Booleans", "d. All of the Above"],
        answer: "b. Other Arrays"
    },

    {
        title: "Commonly used data types DO NOT include",
        choices: ["a. Strings", "b. Booleans", "c. Alerts", "d. Numbers"],
        answer: "c. Alerts"
    },

    {
        title: "How do you write a comment in Javascript?",
        choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. *This is a comment", "d. 'This is a comment'"],
        answer: "a. //This is a comment"
    },

    {
        title: "The first index of an array is _____",
        choices: ["a. 1", "b. 2", "c. 0", "d. None of the above"],
        answer: "c. 0"
    },

    {
        title: "In javascript, which of the following is a logical operator?",
        choices: ["a. ||", "b. &&", "c. $$", "d. @@"],
        answer: "b. &&"
    },
];
//Dom Elements

var currentQuestionIndex = 0;

var quizEl = document.getElementById("quiz");
var timerEl = document.getElementById("timer");
var submitBtn = document.getElementById("submit-score");
var startBtn = document.getElementById("start");
var nameEl = document.getElementById("name");
var feedbackEl = document.getElementById("feedback");
var restartBtn = document.getElementById("restart");
var answerBtn = document.getElementById("answer-buttons");
var startQuizEl = document.getElementById("begin-quiz");
var newQuestion = document.getElementById("questions");
//Quiz state variables

function startQuiz() {
    console.log('start');
    var currentQuestion = questions[currentQuestionIndex];
    newQuestion.textContent = currentQuestion.title;
    answerBtn.textContent = currentQuestion.choices;
    newQuestion.innerHTML = "";
    answerBtn.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        newQuestion.textContent =  currentQuestion;
      }

};



function setTimer() {
    var timerEl = document.querySelector("#timer");
    var secondsLeft = 75;
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
    
    // answerBtn.addEventListener("click ," function() {

    // }
// );
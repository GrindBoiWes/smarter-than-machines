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
    }
];


var quizEl = document.getElementById("quiz");
var timerEl = document.getElementById("timer");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit-score");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("name");
var feedbackEl = document.getElementById("feedback");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
    var beginQuiz = document.getElementById("intro");
    beginQuiz.setAttribute("class", "hide");

    quizEl.removeAttribute("class");

    timerId = setInterval(timeRem, 1000);
    timerEl.textContent = time;

    getQuestions();
}

function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex];

    var questionsEl = document.getElementById("questions");
    questionsEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i){
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);

        choiceBtn.textContent = i + 1 + ". " + choice;

        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }
     timerEl.textContent = time;
     feedbackEl.textContent = "Incorrect!";
     feedbackEl.style.color = "red";
     feedbackEl.style.fontSize = "250%";  
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "purple";
        feedbackEl.style.fontSize = "250%";
    }

    feedbackEl.setAttribute("class", "feedback",);
    setTimeout(function() {
        feedbackEl.setAttribute('class', "feedback hide");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestions();
    }
}

function quizEnd() {
    clearInterval(timerId);

    var resultsEl = document.getElementById("quiz-results");
    resultsEl.removeAttribute("class");

    var finalScore = document.getElementById("final-score");
    finalScore.textContent = time;
    quizEl.style.display = "none";
}

function timeRem() {
    time--;
    timerEl.textContent = "Time Remaining " + time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore(event) {
    var initials = initialsEl.value.trim();
    if (initials !== "") {
        var highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials : initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "/score.html";
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
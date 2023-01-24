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

// Dom Elements

var quizEl = document.getElementById("quiz");
var timerEl = document.getElementById("timer");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit-score");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("name");
var feedbackEl = document.getElementById("feedback");

// quiz variables

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
    // Hides the start screen
    var beginQuiz = document.getElementById("intro");
    beginQuiz.setAttribute("class", "hide");
    // Displays question section
    quizEl.removeAttribute("class");
    // Starts Timer and shows the time
    timerId = setInterval(timeRem, 1000);
    timerEl.textContent = time;

    getQuestions();
}

function getQuestions() {
    // Pulls the current question object from array
    var currentQuestion = questions[currentQuestionIndex];
    // Updates the title of current question
    var questionsEl = document.getElementById("questions");
    questionsEl.textContent = currentQuestion.title;
    // Will clear out any old choices
    choicesEl.innerHTML = "";
    // Loops over choices and creates a button for each choice
    currentQuestion.choices.forEach(function(choice, i){
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);

        choiceBtn.textContent = i + 1 + ". " + choice;
        // Attatches click event listener and displays the button on the screen
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

function questionClick() {
    // This checks if the user clicked the wrong answer and will penalize if selecting the wrong answer
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }
    // This will display the new time on the screen
     timerEl.textContent = time;
     feedbackEl.textContent = "Incorrect!";
     feedbackEl.style.color = "red";
     feedbackEl.style.fontSize = "250%";  
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "purple";
        feedbackEl.style.fontSize = "250%";
    }
    // Will display wether or not the answer was Correct or Incorrect, then remove it once next question is started
    feedbackEl.setAttribute("class", "feedback",);
    setTimeout(function() {
        feedbackEl.setAttribute('class', "feedback hide");
    }, 1000);
    // Cycles through the questions
    currentQuestionIndex++;
    // Checks the timer to make sure all questions have been answered, or will cycle through remaining questions.
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestions();
    }
}

function quizEnd() {
    // Stops the timer
    clearInterval(timerId);
    // Will display the results screen
    var resultsEl = document.getElementById("quiz-results");
    resultsEl.removeAttribute("class");
    // Shows final score and will also clear the page from questions once the quiz is complete
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = time;
    quizEl.style.display = "none";
}

function timeRem() {
    // Updates time
    time--;
    timerEl.textContent = "Time Remaining " + time;
    // Will check to see if timer has ran out
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore(event) {
    // Gets the value of text that is input into text box
    var initials = initialsEl.value.trim();
    if (initials !== "") {
        // Will pull high scores from localStorage, or will set to empty array
        var highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];
        // Formats new score for localStorage
        var newScore = {
            score: time,
            initials : initials
        };
        // Saves information to localStorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        // Takes user into highscore page
        window.location.href = "/score.html";
    }
}

function checkForEnter(event) {\
    // if user hits enter after submit, it will be read
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// submits Initials
submitBtn.onclick = saveHighscore;
// Starts quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
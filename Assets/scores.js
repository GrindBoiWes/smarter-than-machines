

function printHS() {
    // Will either get the scores from localStorage or will set an empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // Sets the highscores in descending order
    highscores.sort(function(a, b){
        return b.score - a.score;
    });

    highscores.forEach(function(score){
        // Creates li tags for each score that is input
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;
        // display scores on screen
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}


function clearHS () {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHS;
// Runs function once the page is loaded
printHS();
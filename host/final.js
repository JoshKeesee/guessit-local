var i = 0;
var scores = [];
var players = JSON.parse(localStorage.getItem("players"));
function showLeaderboard() {
    var players = JSON.parse(localStorage.getItem("players"));
    if (i < players.length) {
        var div = document.createElement("div");
        div.className = "leaderboard";
        div.innerHTML = "<span class='circle'>" + (i + 1) + "</span>" + players[i] + " " + scores[i];
        document.querySelector(".results").appendChild(div);
        i++;
        setTimeout(showLeaderboard, 500);
    }
}
function getScores() {
    for (i = 0; i < players.length; i++) {
        scores.push(localStorage.getItem(players[i]));
    }
    i = 0;
    setTimeout(showLeaderboard, 0);
}
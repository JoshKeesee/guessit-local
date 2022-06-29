var i = 0;
var data = [];
var scores = [];
var players = JSON.parse(localStorage.getItem("players"));
function showLeaderboard() {
    if (i < players.length) {
        var div = document.createElement("div");
        div.className = "leaderboard";
        div.innerHTML = "<span class='circle'>" + (i + 1) + "</span>" + data[i].name + " " + data[i].score;
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
    for (let x = 0; x < players.length; x++) {
        data.push({name: "", score: ""});
        data[x].name = players[x];
        data[x].score = scores[x];
    }
    data.sort((a,b) => a.score < b.score);
    setTimeout(showLeaderboard, 0);
}
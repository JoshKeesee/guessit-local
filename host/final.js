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
        if (i === 0) {
            document.querySelector(".circle").style.background = "gold";
            var timeout = 1000;
        } else if (i === 1) {
            document.querySelectorAll(".circle")[1].style.background = "silver";
            var timeout = 1000;
        } else if (i === 2) {
            document.querySelectorAll(".circle")[2].style.background = "#cd7f32";
            var timeout = 1000;
        } else {
            var timeout = 200;
        }
        i++;
        setTimeout(showLeaderboard, timeout);
    }
}
function getScores() {
    for (i = 0; i < players.length; i++) {
        scores.push(localStorage.getItem(players[i]));
        localStorage.removeItem(players[i]);
    }
    i = 0;
    for (let x = 0; x < players.length; x++) {
        data.push({name: "", score: ""});
        data[x].name = players[x];
        data[x].score = scores[x];
    }
    data = data.sort(function(a,b) { return b.score - a.score });
    setTimeout(showLeaderboard, 1000);
}
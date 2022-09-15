var time = document.getElementsByClassName("timer");
var timings = gup("time");
var i = 0;
var x = 0;  
let y = 0;
var scores = [];
var players = [];
var data = []; 
function Timeout() {  
    if (document.querySelector(".timer").innerHTML != "0:00") {
        if ((timings * 60 - x) % 60 >= 10) {  
            time[0].innerHTML = parseInt(`${(timings * 60 - x) / 60}`) + ":" + `${(timings * 60 - x) % 60}`;  
        } else {  
            time[0].innerHTML = parseInt(`${(timings * 60 - x) / 60}`) + ":0" + `${(timings * 60 - x) % 60}`;  
        }  
        x++;
    }
}
function checkIfDone() {
    if (document.querySelector(".timer").innerHTML === "0:00") {
        setTimeout(end, 1000);
    } else {
        setTimeout(checkIfDone, 0);
    }
}
function end() {
    window.location.href = "/guessit-local/host/final";
}
function gup (name) {
    name = RegExp ('[?&]' + name.replace (/([[\]])/, '\\$1') + '=([^&#]*)');
    return (window.location.href.match (name) || ['', ''])[1];
}
function refreshData() {
    setInterval(function() {
        data = [];
        scores = [];
        players = JSON.parse(localStorage.getItem("players"));
        for (y = 0; y < players.length; y++) {
            scores.push(localStorage.getItem(players[y]));
        }
        for (let y = 0; y < players.length; y++) {
            data.push({name: "", score: ""});
            data[y].name = players[y];
            data[y].score = scores[y];
        }
        data = data.sort(function(a,b) { return b.score - a.score });
        showLeaderboard();
    }, 1000);
}
function showLeaderboard() {
    var removeDivs = document.querySelectorAll(".player");
    for (let i = 0; i < removeDivs.length; i++) {
        removeDivs[i].remove();
    }
    for (i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.className = "player";
        div.innerHTML = "<span class='circle'>" + (i + 1) + "</span>" + data[i].name + " " + data[i].score;
        document.querySelector(".sidebar").appendChild(div);
    }
}
function setTimer() {
    localStorage.setItem("time", document.querySelector(".timer").innerHTML);
    setTimeout(setTimer, 0);
}
let prevPlayers = [];
let gamecode;
let players = [];
var elem = document.documentElement;
function addgame() {
  if (localStorage.getItem("codes") != "") {
    var codes = JSON.parse(localStorage.getItem("codes"));
  } else {
    var codes = ["1"];
  }
  if (JSON.parse(localStorage.getItem("players")) === null || JSON.parse(localStorage.getItem("players")) === "") {
    players = [""];
  } else {
    players = JSON.parse(localStorage.getItem("players"));
  }
  gamecode = codes[codes.length - 1] + 1;
  prevPlayers = players;
  codes.push(JSON.stringify(gamecode));
  localStorage.setItem("codes", JSON.stringify(codes));
  document.querySelector(".code").innerHTML = gamecode;
  localStorage.setItem("players", JSON.stringify(players));
  refreshData();
}
function removegame() {
  codes = JSON.parse(localStorage.getItem("codes"));
  codes.splice(gamecode - 1, 1);
  localStorage.setItem("codes", JSON.stringify(codes));
}
function refreshData() {
  setInterval(function() { 
    players = JSON.parse(localStorage.getItem("players")); 
    if (prevPlayers != players) {
      removePlayers();
      addplayers();
      prevPlayers = players;
    }
  }, 0)
}
function addplayers() {
  if (players[0] != "") {
    document.querySelector("#numplayers").innerHTML = players.length;
    for (let i = 0; i < players.length; i++) {
      var div = document.createElement("div");
      div.className = "player";
      div.innerHTML = players[i];
      document.body.appendChild(div);
    }
  }
}
function removePlayers() {
  for (let i = 0; i < document.querySelectorAll(".player").length; i++) {
    document.querySelectorAll(".player")[i].remove();
  }
}
function start() {
  var time = document.querySelector(".time").value;
  localStorage.setItem("start", "1");
  localStorage.setItem("time", time);
  window.location.href = "/guessit/host/play?time=" + time;
}
let gamecode;
let players = [];
var elem = document.documentElement;
function addgame() {
  if (localStorage.getItem("codes") != "" && localStorage.getItem("codes") != null) {
    var codes = JSON.parse(localStorage.getItem("codes"));
  } else {
    var codes = ["1"];
    localStorage.setItem("codes", JSON.stringify(codes));
  }
  if (JSON.parse(localStorage.getItem("players")) === null || JSON.parse(localStorage.getItem("players")) === "") {
    players = [""];
  } else {
    players = JSON.parse(localStorage.getItem("players"));
  }
  gamecode = JSON.parse(codes[codes.length - 1]) + 1;
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
    removePlayers();
    addplayers();
  }, 850)
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
  var removeDivs = document.querySelectorAll(".player");
  for (let i = 0; i < removeDivs.length; i++) {
      removeDivs[i].remove();
  }
}
function start() {
  var time = document.querySelector(".time").value;
  localStorage.setItem("start", "1");
  localStorage.setItem("time", time);
  window.location.href = "/guessit/host/play?time=" + time;
}
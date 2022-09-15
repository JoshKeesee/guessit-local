let gamecode;
let players = [];
var elem = document.documentElement;
setInterval(checkStart, 0);
function checkStart() {
  if (players[0] != "" && document.querySelector(".time").value != "") {
    document.querySelector(".start").style.opacity = "1";
    document.querySelector(".start").style.cursor = "pointer";
    document.querySelector(".start").disabled = false;
  } else {
    document.querySelector(".start").style.opacity = "0";
    document.querySelector(".start").style.cursor = "default";
    document.querySelector(".start").disabled = true;
  }
}
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
  gamecode = codes.length;
  codes.push(JSON.stringify(gamecode));
  localStorage.setItem("codes", JSON.stringify(codes));
  document.querySelector(".code").innerHTML = gamecode;
  localStorage.setItem("players", JSON.stringify(players));
  refreshData();
}
function removegame() {
  codes = JSON.parse(localStorage.getItem("codes"));
  codes[JSON.parse(gamecode) - 1] = "";
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
  window.location.href = "/guessit-local/host/play?time=" + time;
}
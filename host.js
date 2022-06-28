reload();
if (localStorage.getItem("codes") != "") {
  var codes = JSON.parse(localStorage.getItem("codes"));
  var gamecode = JSON.parse(codes[codes.length - 1]) + 1;
} else {
  var codes = ["0"];
  var gamecode = JSON.parse(codes[codes.length - 1]) + 1;
}
if (JSON.parse(localStorage.getItem("players")) === null || JSON.parse(localStorage.getItem("players")) === "") {
  var players = [""];
} else {
  var players = JSON.parse(localStorage.getItem("players"));
}
var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { 
    elem.msRequestFullscreen();
  }
}
function addgame() {
  codes.push(JSON.stringify(gamecode));
  localStorage.setItem("codes", JSON.stringify(codes));
  document.querySelector(".code").innerHTML = gamecode;
  localStorage.setItem("players", JSON.stringify(players));
}
function removegame() {
  codes = JSON.parse(localStorage.getItem("codes"));
  codes.splice(gamecode - 1, 1);
  localStorage.setItem("codes", JSON.stringify(codes));
}
function reload() {
  setTimeout(reloadpage, 5000);
}
function reloadpage(r) {
  location.reload();
}
function addplayers() {
  players = JSON.parse(localStorage.getItem("players"));
  document.querySelector("#numplayers").innerHTML = players.length;
  if (players[1] != "") {
    for (let i = 0; i < players.length; i++) {
      var div = document.createElement("div");
      div.className = "player";
      div.innerHTML = players[i];
      document.body.appendChild(div);
    }
  }
}
function start() {
  localStorage.setItem("start", "1");
}
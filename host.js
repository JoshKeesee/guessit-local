if (localStorage.getItem("codes") != "") {
  var codes = JSON.parse(localStorage.getItem("codes"));
  var gamecode = JSON.parse(codes[codes.length - 1]) + 1;
} else {
  var codes = ["0"];
  var gamecode = JSON.parse(codes[codes.length - 1]) + 1;
}
if (JSON.parse(localStorage.getItem("players")) === "") {
  let players = [""];
} else {
  let players;
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
  window.location.href = "";
}
function wait() {
  setTimeout(reload, 10000);
}
function addplayers() {
  players = JSON.parse(localStorage.getItem("players"));
  for (let i = 0; i < players.length - 1; i++) {
    var div = document.createElement("div");
    div.className = "player";
    div.innerHTML = players[i];
    document.getElementById("players").appendChild(div);
  }
  setTimeout(addplayers, 0);
}
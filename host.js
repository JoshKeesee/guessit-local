if (localStorage.getItem("codes") != "") {
  var codes = JSON.parse(localStorage.getItem("codes"));
  var gamecode = JSON.parse(codes[codes.length - 1]) + 1;
} else {
  var codes = ["0"];
  var gamecode = JSON.parse(codes[codes.length - 1]) + 1;
}
if (localStorage.getItem("players") === null || localStorage.getItem("players") === "") {
  var players = [""];
} else {
  var players = localStorage.getItem("players");
}
if (localStorage.getItem("reload") != null && localStorage.getItem("reload") != "") {
  var reloadto = localStorage.getItem("reload");
} else {
  var reloadto = '';
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
  localStorage.setItem("players", players);
}
function removegame() {
  codes = JSON.parse(localStorage.getItem("codes"));
  codes.splice(gamecode - 1, 1);
  localStorage.setItem("codes", JSON.stringify(codes));
}
function reload() {
  if (reloadto === "#") {
    reloadto = "";
  } else {
    reloadto = "#";
  }
  localStorage.setItem("reload", reloadto);
  window.location.href = reloadto;
}
function wait() {
  setTimeout(reload, 5000);
}
function addplayers() {
  players = localStorage.getItem("players");
  for (let i = 0; i < players.length - 1; i++) {
    var div = document.createElement("div");
    div.className = "player";
    div.innerHTML = players[i];
    document.body.appendChild(div);
  }
}
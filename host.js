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
  if (localStorage.getItem("codes") != "") {
    var codes = JSON.parse(localStorage.getItem("codes"));
  } else {
    var codes = ["1"];
  }
  var gamecode = JSON.parse(codes[codes.length - 1]) + 1;
  codes.push(JSON.stringify(gamecode));
  localStorage.setItem("codes", JSON.stringify(codes));
  document.querySelector(".code").innerHTML = gamecode;
}
function removegame() {
  codes = localStorage.getItem("codes");
  codes.splice(gamecode - 1, 1);
  localStorage.setItem("codes", codes);
}
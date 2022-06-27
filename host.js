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
if (localStorage.getItem("codes") != null) {
  let codes = localStorage.getItem("codes");
} else {
  let codes = [];
}
function addgame() {
  let gamecode = codes.length;
  codes.push(JSON.stringify(codes.length + 1));
  localStorage.setItem("codes", JSON.stringify(codes));
  document.querySelector(".code").innerHTML = gamecode;
}
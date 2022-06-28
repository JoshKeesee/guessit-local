var time = document.getElementsByClassName("timer");
var timings = gup("time");
var i = 0;  
var myInterval = setInterval(Timeout, 1000);  
function Timeout() {  
    if ((timings * 60 - i) % 60 >= 10) {  
        time[0].innerHTML = parseInt(`${(timings * 60 - i) / 60}`) + ":" + `${(timings * 60 - i) % 60}`;  
    } else {  
        time[0].innerHTML = parseInt(`${(timings * 60 - i) / 60}`) + ":0" + `${(timings * 60 - i) % 60}`;  
    }  
    i++;
}
function checkIfDone() {
    if (document.querySelector(".timer").innerHTML === "0:00") {
        setTimeout(end, 5000);
        clearInterval(Timeout);
    }
    setTimeout(checkIfDone, 0);
}
function end() {
    window.location.href = "/guessit/host/final";
}
function gup (name) {
    name = RegExp ('[?&]' + name.replace (/([[\]])/, '\\$1') + '=([^&#]*)');
    return (window.location.href.match (name) || ['', ''])[1];
}

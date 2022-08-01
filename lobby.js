function check() {
    if (localStorage.getItem("start") === "1") {
        var nickname = gup("nickname");
        window.location.href = "game?nickname=" + nickname;
    } else {
        setTimeout(check, 0);
    }
}
function gup (name) {
    name = RegExp ('[?&]' + name.replace (/([[\]])/, '\\$1') + '=([^&#]*)');
    return (window.location.href.match (name) || ['', ''])[1];
}
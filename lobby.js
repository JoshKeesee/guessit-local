function reload() {
    setTimeout(reloadpage, 2000);
}
function reloadpage() {
    location.reload();
}
function check() {
    if (localStorage.getItem("start") === "1") {
        window.location.href = "game";
    }
}
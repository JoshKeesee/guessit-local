let codes = [];
let gamecode;
let nickname;
let questions = ["What is 3 * 3?", "What is 3 - 2?"];
let answers = [{correct: "9", first: "10", second: "8", third: "6" }, { correct: "1", first: "0", second: "2", third: "-1" }];
if (localStorage.getItem("answers") != null) {
  answers = JSON.parse(localStorage.getItem("answers"));
  questions = JSON.parse(localStorage.getItem("questions"));
} else {
  updateLists();
}
let question;
let answer;
let random;
let other;
let answer1;
let answer2;
let answer3;
let correct1;
let players = [];
let score = 0;
if (document.getElementById("info") != null) {
  let input = document.getElementById("info");
  input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});
}
function enterGamecode() {
  questions = JSON.parse(localStorage.getItem("questions"));
  answers = JSON.parse(localStorage.getItem("answers"));
  gamecode = document.getElementById("info").value;
  localStorage.setItem("gamecode", gamecode);
  codes = JSON.parse(localStorage.getItem("codes"));
  if (gamecode === "0") {
    document.getElementById("invalid").innerHTML = "Game not found";
  } else if (!(codes.includes(gamecode))) {
    document.getElementById("invalid").innerHTML = "Game not found";
  } else if (questions.length === 0) {
    document.getElementById("invalid").innerHTML = "No questions in this set";
  } else if (localStorage.getItem("start") === "1") {
    document.getElementById("invalid").innerHTML = "This game has already started";
  } else {
    document.getElementById("invalid").innerHTML = "";
    document.getElementById("info").placeholder = "Nickname";
    document.getElementById("info").value = "";
    document.getElementById("info").type = "text";
    document.getElementById("title").innerHTML = "Enter your nickname";
    document.getElementById("title").style.fontSize = "8vmin";
    document.getElementById("submit").onclick = function() { enterNickname() };
  }
}
function enterNickname() {
  nickname = document.getElementById("info").value;
  nickname = nickname.split(" ").join("");
  if (JSON.parse(localStorage.getItem("players")) != "" && JSON.parse(localStorage.getItem("players")) != null) {
    players = JSON.parse(localStorage.getItem("players"));
  }
  players.splice(players.length - 1, 0, nickname);
  localStorage.setItem("players", JSON.stringify(players));
  window.location.href = "lobby?nickname=" + nickname;
}
function setQuestion() {
  random = Math.floor(Math.random() * 4) + 1;
  question = random_item(questions);
  answer = answers[questions.indexOf(question)].correct;
  document.getElementById("questionbox").innerHTML = question;
  document.getElementById("answer" + random).innerHTML = answer;
  other = random + 1;
  if (other === 5) {
    other = 1;
  }
  document.getElementById("answer" + other).innerHTML = answers[questions.indexOf(question)].first;
  other = other + 1;
  if (other === 5) {
    other = 1;
  }
  document.getElementById("answer" + other).innerHTML = answers[questions.indexOf(question)].second;
  other = other + 1;
  if (other === 5) {
    other = 1;
  }
  document.getElementById("answer" + other).innerHTML = answers[questions.indexOf(question)].third;
}
function checkAnswer(x) {
  document.getElementById("check").onclick = function() { hideCheck() };
  document.getElementById("check").style.cursor = "pointer";
  document.getElementById("continue").style.cursor = "pointer";
  document.getElementById("continue").style.opacity = "1";
  document.getElementById("continue").style.zIndex = "11";
  if (x === "answer" + random) {
    document.getElementById("check").style.opacity = "1";
    document.getElementById("check").innerHTML = "Correct!";
    document.getElementById("check").style.background = "#4CBB17";
    document.getElementById("check").style.zIndex = "10";
    score = score + 100;
  } else {
    document.getElementById("check").style.opacity = "1";
    document.getElementById("check").innerHTML = "Incorrect";
    document.getElementById("check").style.background = "red";
    document.getElementById("check").style.zIndex = "10";
    if (score > 0) {
      score = score - 50;
    }
  }
}
function setGamecode() {
  gamecode = localStorage.getItem("gamecode");
  setScore();
}
function setScore() {
  nickname = gup("nickname");
  document.querySelector(".nickname").innerHTML = nickname + "<br>" + score;
  setTimeout(setScore, 0);
}
function hideCheck() {
  document.getElementById("check").style.zIndex = "-1";
  document.getElementById("continue").style.zIndex = "-1";
  document.getElementById("check").style.opacity = "0";
  document.getElementById("continue").style.opacity = "0";
  document.getElementById("check").style.cursor = "default";
  document.getElementById("check").onclick = "none";
  document.getElementById("continue").style.cursor = "default";
  setQuestion();
}
function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}
function addQuestion() {
  window.scrollTo(0, 0);
  document.getElementById("a1").value = "";
  document.getElementById("a2").value = "";
  document.getElementById("a3").value = "";
  document.getElementById("a4").value = "";
  document.getElementById("q1").value = "";
  document.getElementById("createQuestion").style.opacity = "1";
  document.getElementById("createQuestion").style.marginTop = "220px";
  document.getElementById("createQuestion").style.zIndex = "11";
  document.getElementById("submitQuestion").style.opacity = "1";
  document.getElementById("submitQuestion").style.zIndex = "12";
}
function save() {
  correct1 = document.getElementById("a1").value;
  answer1 = document.getElementById("a2").value;
  answer2 = document.getElementById("a3").value;
  answer3 = document.getElementById("a4").value;
  document.getElementById("createQuestion").style.opacity = "0";
  document.getElementById("createQuestion").style.marginTop = "-100px";
  document.getElementById("createQuestion").style.zIndex = "-1";
  document.getElementById("submitQuestion").style.opacity = "0";
  document.getElementById("submitQuestion").style.zIndex = "-1";
  if (answer1 === "") {
    answer1 = "No answer provided";
  }
  if (answer2 === "") {
    answer2 = "No answer provided";
  }
  if (answer3 === "") {
    answer3 = "No answer provided";
  }
  if (correct1.length !== 0) {
    questions.push(document.getElementById("q1").value);
    answers.push({ correct: "", first: "", second: "", third: "" });
    answers[answers.length - 1].correct = correct1;
    answers[answers.length - 1].first = answer1;
    answers[answers.length - 1].second = answer2;
    answers[answers.length - 1].third = answer3;
    resetQuestions();
  }
  updateLists();
}
function resetQuestions() {
  location.reload();
}
function createQuestions() {
  if (localStorage.getItem("questions") != "") {
    questions = JSON.parse(localStorage.getItem("questions"));
    answers = JSON.parse(localStorage.getItem("answers"));
    for (i = 0; i < questions.length; i++) {
      const div = document.createElement("div");
      div.className = "questionDisplay";
      div.innerHTML = "Question " + (i + 1) + ")" + "<br>" + questions[i] + "<hr>" + "1) " + answers[i].correct + "<br>" + "2) " + answers[i].first + "<br>" + "3) " + answers[i].second + "<br>" + "4) " + answers[i].third + "<hr>" + "Correct answer: " + answers[i].correct;
      div.id = i;
      div.onclick = function() { edit(this.id) };
      document.body.appendChild(div);
    }
  }
}
function edit(y) {
  window.scrollTo(0, 0);
  document.getElementById("createQuestion").style.opacity = "1";
  document.getElementById("createQuestion").style.marginTop = "220px";
  document.getElementById("createQuestion").style.zIndex = "11";
  document.getElementById("submitQuestion").style.opacity = "1";
  document.getElementById("submitQuestion").style.zIndex = "12";
  document.getElementById("a1").value = answers[y].correct;
  document.getElementById("a2").value = answers[y].first;
  document.getElementById("a3").value = answers[y].second;
  document.getElementById("a4").value = answers[y].third;
  document.getElementById("q1").value = questions[y];
  document.getElementById("submitQuestion").onclick = function() { updateQuestion(y) };
}
function updateQuestion(y) {
  document.getElementById("submitQuestion").onclick = function() { save() };
  questions[y] = document.getElementById("q1").value;
  answers[y].correct = document.getElementById("a1").value;
  answers[y].first = document.getElementById("a2").value;
  answers[y].second = document.getElementById("a3").value;
  answers[y].third = document.getElementById("a4").value;
  updateLists();
  resetQuestions();
}
function updateLists() {
  localStorage.setItem("answers", JSON.stringify(answers));
  localStorage.setItem("questions", JSON.stringify(questions));
}
function home() {
  window.location.href = "./index";
}
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".header").style.fontSize = "2vmin";
    document.querySelector(".icon").style.width = "5vmin";
  } else {
    document.querySelector(".header").style.fontSize = "4vmin";
    document.querySelector(".icon").style.width = "6.5vmin";
  }
}
function host() {
  localStorage.setItem("players", JSON.stringify([""]));
  localStorage.setItem("start", "0");
  window.location.href = 'host';
}
function gup (name) {
  name = RegExp ('[?&]' + name.replace (/([[\]])/, '\\$1') + '=([^&#]*)');
  return (window.location.href.match (name) || ['', ''])[1];
}
function setTimer() {
  setTimeout(endGame, 600000);
}
function endGame() {
  localStorage.setItem(nickname, score);
  window.location.href = "/guessit/end";
}
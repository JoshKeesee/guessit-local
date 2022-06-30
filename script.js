let codes = [];
let gamecode;
let nickname;
let questions = [];
let answers = [];
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
let playername = [];
let multiplier = 1;
let rewards = ["x2 multiplier", "Score x1.5", "+50", "+200", "+500", "x3 multiplier", "+1", "+750", "Lose half"];
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
  if (gamecode === "1") {
    document.getElementById("invalid").innerHTML = "Game not found";
  } else if (gamecode === "0") {
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
  if (nickname === "") {
    document.getElementById("invalid").innerHTML = "Please enter a nickname";
  } else if (!(players.includes(nickname))) {
    players.splice(players.length - 1, 0, nickname);
    localStorage.setItem("players", JSON.stringify(players));
    window.location.href = "lobby?nickname=" + nickname;
  } else {
    document.getElementById("invalid").innerHTML = "Nickname already in use";
  }
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
  document.getElementById("continue").style.zIndex = "13";
  if (x === "answer" + random) {
    document.getElementById("check").style.opacity = "1";
    document.getElementById("check").innerHTML = "Correct!";
    document.getElementById("check").style.background = "#4CBB17";
    document.getElementById("check").style.zIndex = "12";
    score = score + multiplier;
    setTimeout(showRewards, 200);
  } else {
    document.getElementById("check").style.opacity = "1";
    document.getElementById("check").innerHTML = "Incorrect";
    document.getElementById("check").style.background = "red";
    document.getElementById("check").style.zIndex = "12";
    if (score > 0) {
      score = score - (multiplier / 2);
    }
  }
  localStorage.setItem(playername, score);
}
function setGamecode() {
  gamecode = localStorage.getItem("gamecode");
  nickname = gup("nickname");
  for (let i = 0; nickname[i] != "?"; i++) {
    playername.push(" ");
    playername[i] = nickname[i];
  }
  playername = playername.join("");
  localStorage.setItem(playername, score);
  document.querySelector(".nickname").innerHTML = playername;
  setScore();
}
function setScore() {
  document.querySelector(".score").innerHTML = "<br>" + score;
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
  document.getElementById("deleteQuestion").style.opacity = "1";
  document.getElementById("deleteQuestion").onclick = function() { deleteQuestion(null) };
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
function deleteQuestion(y) {
  if (y != null) {
    questions.splice(y, 1);
    localStorage.setItem("questions", JSON.stringify(questions));
    answers.splice(y, 1);
    localStorage.setItem("answers", JSON.stringify(answers));
    resetQuestions();
  } else {
    save();
  }
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
  document.getElementById("deleteQuestion").style.opacity = "1";
  document.getElementById("deleteQuestion").onclick = function() { deleteQuestion(y) };
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
  var time = gup("time");
  time = time * 60000;
  setTimeout(endGame, time);
}
function endGame() {
  localStorage.setItem(playername, score);
  window.location.href = "/guessit/end";
}
function reward(x) {
  document.querySelector(".item1").onclick = "";
  document.querySelector(".item2").onclick = "";
  document.querySelector(".item3").onclick = "";
  var randomreward = randomReward();
  document.querySelector(".item" + x).innerHTML = randomreward;
  if (x != 1) {
    document.querySelector(".item1").style.opacity = "0";
  }
  if (x != 2) {
    document.querySelector(".item2").style.opacity = "0";
  }
  if (x != 3) {
    document.querySelector(".item3").style.opacity = "0";
  }
  var rewardtype = rewards.indexOf(randomreward);
  if (rewardtype === 0) {
    multiplier = multiplier * 2;
  } else if (rewardtype === 1) {
    score = Math.round(score * 1.5);
  } else if (rewardtype === 2) {
    score = score + 50;
  } else if (rewardtype === 3) {
    score = score + 200;
  } else if (rewardtype === 4) {
    score = score + 500;
  } else if (rewardtype === 5) {
    multiplier = multiplier * 3;
  } else if (rewardtype === 6) {
    score = score + 1;
  } else if (rewardtype === 7) {
    score = score + 750;
  } else if (rewardtype === 8) {
    score = Math.round(score / 2);
  }
  setTimeout(hideRewards, 1000);
}
function randomReward() {
  return random_item(rewards);
}
function showRewards() {
  document.querySelector(".rewards").style.display = "block";
  document.querySelector(".item1").style.display = "block";
  document.querySelector(".item2").style.display = "block";
  document.querySelector(".item3").style.display = "block";
  document.querySelector(".item1").onclick = function() { reward(1) };
  document.querySelector(".item2").onclick = function() { reward(2) };
  document.querySelector(".item3").onclick = function() { reward(3) };
}
function hideRewards() {
  document.querySelector(".rewards").style.display = "none";
  document.querySelector(".item1").style.display = "none";
  document.querySelector(".item2").style.display = "none";
  document.querySelector(".item3").style.display = "none";
  document.querySelector(".item1").style.opacity = "1";
  document.querySelector(".item2").style.opacity = "1";
  document.querySelector(".item3").style.opacity = "1";
  document.querySelector(".item1").innerHTML = "Reward 1";
  document.querySelector(".item2").innerHTML = "Reward 2";
  document.querySelector(".item3").innerHTML = "Reward 3";
  localStorage.setItem(playername, score);
}
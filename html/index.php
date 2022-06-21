<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <link rel='icon' type='image/xicon' href='icon.png'>
  <meta name="viewport" content="width=device-width">
  <title>Guessit</title>
  <link href="style.css" rel="stylesheet" type="text/css" />
  <?php
  $servername = "localhost";
  $username = "root";
  $password = "password";
  
  // Create connection
  $conn = new mysqli($servername, $username, $password);
  
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  echo "Connected successfully";
  ?> 
</head>

<body>
  <div class='header'>
    <img src='icon.png' class='icon'>
    Guessit
    <a class='join' href='join.html'>Join Game</a>
    <a class='create' href='create.html'>Create+</a>
  </div>
  <img class="icons" src="classroomicon.jpg">
  <img class="icons" src="quizicon.jpg">
  <div class="content">
    Hello!
    <br>
    <br>
    This is Guessit.
    An online, interactive game to run YOUR quizzes!
    <img class="contenticon" src="icon.png">
  </div>
  <a class='createicon'>Create+</a>
  <div class="content2">
    Create questions and sets with the Create+ button...
    <br><br><br><br>
    ...and join games with the join button!
  </div>
  <a class='joinicon'>Join Game</a>
  <div class="content3">
    Lets get ready to rock with stylish answer buttons on the players screens!
    <img class="ingameicon" src="ingame.jpg">
  </div>
  <div class="credit">
    <a class="homepage" href="https://joshkeesee.github.io/">Joshua Keesee's Homepage</a>
    <p>Copyright &copy; 2022 Guessit LLC. All Rights Reserved.</p>
  </div>
  <script src="script.js"></script>
</body>

</html>
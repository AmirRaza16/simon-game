var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var timer = 500;
var level = 0;
document.querySelector(".high-score").style.display = "none";
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  gamePattern.push(buttonColours[randomNumber]);
  setTimeout(function () {
    $("#" + buttonColours[randomNumber])
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
  }, timer);

  //   playSound(randomChosenColour);
  return randomNumber;
}

$(".btn").click(function (e) {
  var userChosenColour = e.target.id;
  console.log(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer();
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  if (
    gamePattern[userClickedPattern.length - 1] ===
    userClickedPattern[userClickedPattern.length - 1]
  ) {
    nextSequence();
    level++;
    timer = timer - 10;
    $("#level-title").text("Level " + level);
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}
function startOver() {
  timer = 500;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

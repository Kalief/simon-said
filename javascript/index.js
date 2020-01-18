var color = ["red", "blue", "yellow", "green"];
var userClickPattern = [];
var gamePattern = [];
var gameStarted = false;
var level = 0;

$(document).keypress(function(event) {
  if (event.key == "a") {
    if(!gameStarted && level == 0) {
      increaseLevel();
      gameStarted = true;
    }
  }
});

$(".box").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);

  animate(userChosenColor);

  checkAnswer(userClickPattern.length - 1);
});

function animate(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 150);
}

function increaseLevel() {
  userClickPattern = [];
  level += 1;
  $("h1").text("Level " + level);
  var randomColor = Math.floor(Math.random() * color.length);
  gamePattern.push(color[randomColor]);

  for(var i = 0; i < gamePattern.length; i++) {
    setTimeout(animate, 500 * i, gamePattern[i]);
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickPattern[currentLevel]) {
    if(gamePattern.length == userClickPattern.length) {
      setTimeout(function() {
        increaseLevel();
      }, 1000);
    }
  } else {
    $("h1").text("You lose! Press A to start again.");
    level = 0;
    gamePattern = [];
    gameStarted = false;
  }
}

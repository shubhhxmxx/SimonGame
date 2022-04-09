var color = ["red", "blue", "green", "yellow"];
var pattern = [];
var userClickedPattern=[];
var level = 0;
var started=false;
function updatetext() {
  $("h1").text("Level " + level);
}
$(document).on('click',function(e){
var x=e.target.id;
  for(var i=0;i<4;i++){
  if(color[i]!=x) continue;
  var userChosenColour=x;
  console.log("userchosen"+userChosenColour);
  userClickedPattern.push(userChosenColour);
  makesound(userChosenColour);
  animate(userChosenColour);
  checkanswer(userClickedPattern.length-1);
  }

}
);

$(document).keypress(function(){
  if(started==false){
    $("level-title").text("Level"+level);
    started=true;
    nextSequence();
  }
});

function checkanswer(currentLevel){
  if(pattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("sucess");
    if(userClickedPattern.length==pattern.length){
      setTimeout(function(){
        nextSequence()
      },1000);
    }
  }
  else{
    console.log("fail");
    makesound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);
    $("#level-title").text("Game Over! press any key to Restart game");
    startover();
  }
}
function startover(){
  started=false;
  pattern=[];
  level=0;
}
function nextSequence(){
  userClickedPattern=[];
  level++;
  updatetext();
  var index=Math.floor(Math.random()*4);
  var chosencolor=color[index];
  pattern.push(chosencolor);
  $("#"+chosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
  makesound(chosencolor);
  console.log(chosencolor)
}
function animate(presscolor){
  $("#"+presscolor).addClass("pressed");
  setTimeout(function(){
    $("#"+presscolor).removeClass("pressed"),100
  });
}

function makesound(x) {
  var audiofile = "sounds/" + x + ".mp3";
  console.log(audiofile);
  var sound = new Audio(audiofile);
  sound.play();
}

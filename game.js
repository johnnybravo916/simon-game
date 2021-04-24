const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(".btn").on("click", function () {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(gamePattern);
    checkAnswer(userClickedPattern.length - 1);
});

const nextSequence = () => {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text(`Level ${level}`);
};

const playSound = (name) => {
    const audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
};

const animatePress = (currentColour) => {
    $(`#${currentColour}`).addClass("blah");
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("blah");
    }, 1000);
};

const checkAnswer = (currentLevel) => {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            console.log(userClickedPattern.length);
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        const audio = new Audio(`./sounds/wrong.mp3`);
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

const startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
};

$(document).on("keypress", function () {
    if (!started){
        started = true;
        setTimeout(function () {
            nextSequence();
        }, 1000);
        $("#level-title").text(`Level ${level}`);
    }
});



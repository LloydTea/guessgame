const guessWordsArray = [
  ["A", "E", "I", "O", "U"],
  ["BAT", "CAT", "DOG", "PIG", "RAT"],
  ["CAKE", "RICE", "PEAS", "BEANS"],
];

//Stage Counter
let stageCounter = 1;

//Choosen Word As An Empty Array
let choosenWord = [];

// Guess Count And Hint Count For Every Stage
let guessCounter = 0;

// Good Guess Counter
let goodGuessCounter = 0;

// Chances Given For Every Stage
var chances_given;

//Player Guess Holder
let letterHolder = [];
let hiddenwordletter = [];

let highest_score = 100.0;
let new_score;

//Set Guess And More To Guess To False
var moretoguess = true;

var showGuess = document.getElementById("showguess");

// Progress Bar Declaration
var progressBar = document.getElementById("progressbar");

// Progress Text Change
var progress = document.getElementById("progress");

var stageCounterTag = document.getElementById("stageCounter");
stageCounterTag.innerHTML = stageCounter;

var heigestScoreTag = document.getElementById("heigestScore");
heigestScoreTag.innerHTML = "100.00%";

var yourScoreTag = document.getElementById("yourScore");

var remarkHeadingTag = document.getElementById("remarkHeading");

var remarkBodyTag = document.getElementById("remarkBody");

var stageProgressBar = document.getElementById("stageProgress");

var nextStageBtn = document.getElementById("nextStage");

var imgDisplayTag = document.getElementById("imgDisplay");

var hintDisplayTag = document.getElementById("hintDisplay");

var gdImage = document.getElementById("gdImage");
var gameOn = document.getElementById("gameOn");
var gameDone = document.getElementById("gameDone");

var instruction = document.getElementById("show");

//Input Field Declaration
var inputGuess = document.getElementById("guessletter");

let myModal = new bootstrap.Modal(document.getElementById("complete"), {});

let rulesModal = new bootstrap.Modal(document.getElementById("rules"), {});

// var displayModal = document.getElementById("complete")

const setwords = (x) => {
  console.log(x);
  progress.innerHTML = "";
  hiddenwordletter = Array.from(x);
  for (let i = 0; i < hiddenwordletter.length; i++) {
    letterHolder[i] = "_";
  }

  //Set Number Of Guesses, Which Is 1 Plus The length Of The Hidden Word
  chances_given = 1 + hiddenwordletter.length;
  if (stageCounter == 1) {
    instruction.innerHTML = "It's Just One Letter And You Have 2 Guesses.";
  } else {
    instruction.innerHTML =
      "It's a word of " +
      hiddenwordletter.length +
      " letters and you have " +
      chances_given +
      " guesses to make.";
  }
  showGuess.value = letterHolder.join("");
};

const gameStarter = () => {
  // Rules Checker, Check If Rules Has Been Displayed Already
  let showedRules = localStorage.getItem("showedRules");

  // If rules has been showed do not show rules again on load.
  if (!showedRules) {
    rulesModal.show();
  }
  //Get New Index At Random.
  let shuffle_index = Math.floor(
    Math.random() * guessWordsArray[stageCounter - 1].length
  );

  //Set New Guess Word
  setwords(guessWordsArray[stageCounter - 1][shuffle_index]);

  // Reset Values
  progressBar.style = "width:0";
  guessCounter = 0;
  goodGuessCounter = 0;

  //   Set that rules has been showed to true
  localStorage.setItem("showedRules", true);
};

gameStarter();

//Event Listener When The Enter Key Is Pressed On The Input Field
inputGuess.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && inputGuess.value != "") {
    event.preventDefault();
    checkguess(inputGuess.value);
  }
});

nextStageBtn.addEventListener("click", function () {
  gameStarter();
});

const checkguess = (x) => {
  //If Number Of Guess Left Isn't 0
  hintDisplayTag.innerHTML = "";
  guessCounter++;
  if (guessCounter <= chances_given) {
    progress.innerHTML =
      "You have used " + guessCounter + " guess(es) out of " + chances_given;

    //Check If Letter Is In The HiddenWordLetter Array
    if (hiddenwordletter.includes(x)) {
      let i = hiddenwordletter.indexOf(x);
      letterHolder[i] = x;
      delete hiddenwordletter[i];
      goodGuessCounter++;
      progressBarFunction(goodGuessCounter);
      moreLettersToGuess();
    }

    if (guessCounter == chances_given && letterHolder.includes("_")) {
      nextStage(false);
    }
    showGuess.value = letterHolder.join("");
    inputGuess.value = "";
    inputGuess.focus();
  } else {
    nextStage(false);
  }
};

const moreLettersToGuess = () => {
  if (letterHolder.includes("_")) {
    moretoguess = true;
  } else {
    nextStage(true);
  }
};

const showHint = () => {
  guessCounter++;
  if (stageCounter == 1) {
    let hint = guessWordsArray[stageCounter - 1];

    let index = hint.indexOf(hiddenwordletter.join()) + 1;

    let suffix = positionSuffix(index);

    hintDisplayTag.innerHTML =
      "The <b>" + index + suffix + "</b> Vowel of the alphabet.";
  } else if (stageCounter == 2) {
    let index = Math.floor(Math.random() * hiddenwordletter.length);

    let suffix = positionSuffix(index + 1);

    hintDisplayTag.innerHTML =
      "It's The Name Of An Animal, And The " +
      (index + 1) +
      suffix +
      " Letter is " +
      hiddenwordletter[index] +
      ".";
  } else if (stageCounter == 3) {
    let index = Math.floor(Math.random() * hiddenwordletter.length);

    let suffix = positionSuffix(index + 1);

    hintDisplayTag.innerHTML =
      "It's The Name Of A Food, And The " +
      (index + 1) +
      suffix +
      " Letter is " +
      hiddenwordletter[index] +
      ".";
  }

  progress.innerHTML =
    "You have used " + guessCounter + " guesses out of " + chances_given;
};

const positionSuffix = (x) => {
  x = x.toString();
  if (x[x.length - 1] == "1") {
    pSuffix = "st";
  } else if (x[x.length - 1] == "2") {
    pSuffix = "nd";
  } else if (x[x.length - 1] == "3") {
    pSuffix = "rd";
  } else {
    pSuffix = "th";
  }

  return pSuffix;
};

const progressBarFunction = (x) => {
  let widthPercent = (x / hiddenwordletter.length) * 100 + "% !important";
  console.log(x);
  progressBar.style = "width:" + widthPercent;
};

const nextStage = (x) => {
  if (x) {
    //Increase Stage By 1
    stageCounter++;
    //Convert Stage To Percentage
    let stagePercent = ((stageCounter - 1) / guessWordsArray.length) * 100;

    //Sent Percentage As Width Of Stage Progress Bar
    stageProgressBar.style = "width:" + stagePercent + "% !important";

    // Set Remark Heading To Congratulations
    remarkHeadingTag.innerHTML = "Congratulations";

    //Set Current Score To Stage Percentage Approximate To Two Decimal Places
    yourScoreTag.innerHTML = stagePercent.toFixed(2) + "%";

    imgDisplayTag.src =
      "https://raw.githubusercontent.com/LloydTea/guessgame/814621ac4634c06f2c357921fa4b2411046f4772/Congratulations.png";

    //If Condition For Last Stage Of The Game
    if (stagePercent < 100) {
      //Set To Through To The Next Round
      remarkBodyTag.innerHTML = "You're Through to the next round";
      nextStageBtn.innerHTML =
        'Next Challenge <i class="bi bi-arrow-right-circle"></i>';
    } else {
      //Set To Game Completed
      remarkBodyTag.innerHTML = "You have successfully completed the game.";
      gameOn.classList.add("d-none");
      gameDone.classList.remove("d-none");
      gdImage.src =
        "https://raw.githubusercontent.com/LloydTea/guessgame/814621ac4634c06f2c357921fa4b2411046f4772/Congratulations.png";

      nextStageBtn.innerHTML =
        'Start Over <i class="bi bi-arrow-right-circle"></i>';
    }
  } else {
    imgDisplayTag.src =
      "https://raw.githubusercontent.com/LloydTea/guessgame/814621ac4634c06f2c357921fa4b2411046f4772/gameover.png";
    gdImage.src =
      "https://raw.githubusercontent.com/LloydTea/guessgame/814621ac4634c06f2c357921fa4b2411046f4772/gameover.png";
    remarkHeadingTag.innerHTML = "You Can Do Better";
    remarkBodyTag.innerHTML = "Failure is when you stop trying";
    nextStageBtn.innerHTML =
      'Try Again <i class="bi bi-arrow-right-circle"></i>';
    gameOn.classList.add("d-none");
    gameDone.classList.remove("d-none");
    stageCounter = 1;
  }

  // Open PopUp
  myModal.show();
  stageCounterTag.innerHTML = stageCounter;
};

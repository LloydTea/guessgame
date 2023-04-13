const guessWordsArray = [["A"], ["BAT", "CAT"],["CAKE", "BAKE"]]

let stageCounter = 1;

let choosenWord = [];

let entryLetter = [];

let guessCounter = 0;
let goodGuessCounter = 0;
var chances_given;

let letterHolder = [];
let hiddenwordletter = [];

let highest_score = 100
let new_score;

//Set Guess And More To Guess To False
var moretoguess = false;

var showGuess = document.getElementById("showguess")

// Progress Bar Declaration
var progressBar = document.getElementById("progressbar")

// Progress Text Change
var progress = document.getElementById("progress")

var stageCounterTag = document.getElementById("stageCounter")
stageCounterTag.innerHTML = stageCounter;
var heigestScoreTag = document.getElementById("heigestScore")
heigestScoreTag.innerHTML = "100%"
var yourScoreTag = document.getElementById("yourScore")
var remarkHeadingTag = document.getElementById("remarkHeading")
var remarkBodyTag = document.getElementById("remarkBody")
var stageProgressBar = document.getElementById("stageProgress")
var nextStageBtn = document.getElementById("nextStage")

//Input Field Declaration
var inputGuess = document.getElementById("guessletter");

let myModal = new bootstrap.Modal(document.getElementById('complete'), {});

// var displayModal = document.getElementById("complete")


const setwords = (x) =>{
    console.log(x)
    progress.innerHTML = ""
    hiddenwordletter =  Array.from(x)
    for (let i=0; i < hiddenwordletter.length; i++){
    	letterHolder[i] = "_";
    }
    //Set Number Of Guesses, Which Is 2 Plus The length Of The Hidden Word
    chances_given = 2 + hiddenwordletter.length;

    document.getElementById("show").innerHTML = "It's a word of "+ hiddenwordletter.length + " letters and you have " + chances_given +" guesses to make.";
    showGuess.value = letterHolder.join('');
}
const gameStarter = () =>{
    let shuffle_index = Math.floor(Math.random() * guessWordsArray[stageCounter-1].length);
    console.log()
    setwords(guessWordsArray[stageCounter-1][shuffle_index]);
    progressBar.style = "width:0";
    guessCounter = 0;
    goodGuessCounter = 0;
}
gameStarter()

//Event Listener When The Enter Key Is Pressed On The Input Field
inputGuess.addEventListener("keypress", function(event) {
  if (event.key === "Enter" && inputGuess.value != "") {
    event.preventDefault();
    checkguess(inputGuess.value)
  }
});

nextStageBtn.addEventListener("click",function() {
    gameStarter();
})

const checkguess = (x) =>{
    //If Number Of Guess Left Isn't 0
    if(guessCounter < chances_given){

        guessCounter++
        progress.innerHTML = guessCounter +" guesses out of "+ chances_given;

        //Check If Letter Is In The HiddenWordLetter Array
        if(hiddenwordletter.includes(x)){
            let i = hiddenwordletter.indexOf(x)
            letterHolder[i] = x;
            hiddenwordletter[i] = "Done";
            goodGuessCounter++;
            progressBarFunction(goodGuessCounter)
            console.log(letterHolder)
            console.log(hiddenwordletter)
        }

        showGuess.value = letterHolder.join('');
        inputGuess.value="";
        inputGuess.focus()

        if(letterHolder.includes("_")){
            moretoguess = true
        }else{
            if (stageCounter < guessWordsArray.length) {
                stageCounterTag.innerHTML = stageCounter+1
            }
            nextStage()
        }

    }
    
}

const progressBarFunction = (x) =>{
    let widthPercent = ((x/hiddenwordletter.length)* 100)+"% !important"
    console.log(x)
    progressBar.style = "width:"+ widthPercent;
}
const nextStage = () =>{
    // Open PopUp
    myModal.show()
    
    //Increase Stage By 1
    stageCounter++

    //Convert Stage To Percentage
    let stagePercent = ((stageCounter-1)/guessWordsArray.length)* 100

    //Sent Percentage As Width Of Stage Progress Bar
    stageProgressBar.style = "width:"+ stagePercent+"% !important";

    // Set Remark Heading To Congratulations
    remarkHeadingTag.innerHTML ="Congratulations"

    //Set Current Score To Stage Percentage Approximate To Two Decimal Places
    yourScoreTag.innerHTML = stagePercent.toFixed(2) + "%"

    //If Condition For Last Stage Of The Game
    if(stagePercent < 100){

        //Set To Through To The Next Round
        remarkBodyTag.innerHTML ="You're Through to the next round"
    }else{

        //Set To Game Completed
        remarkBodyTag.innerHTML ="You have successfully completed the game."
    }

}

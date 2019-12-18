console.log("app.js is loaded");

let count = 0;
let repeat = document.getElementById("repeat");
let next = document.getElementById("next");
let experiment = document.getElementById("experiment");
let spot = document.getElementById("spot");
let answerDisplay = document.getElementById("answer");
let answerText = document.getElementById("answerText");
let answers = [
    "What follows is a series of visual experiments devised by Schopenhauer in his essay, 'On Vision and Colors'. For best results view in a dark room at full brightness. Click next to begin.",
    "You will soon see an image for about 30 seconds followed by a blank screen for 20 seconds. Focus on the image while it is there, and notice what you see when the background changes.",
    "When the image disappeared, you should have seen a black circle on a white background.",
    "When the image disappeared, you should have seen a violet circle on a white background.",
    "When the image disappeared, you should have seen an orange circle on a white background."    
]
let myTimeout;

let showColor = (color) => {
    clearTimeout(myTimeout);
    console.log( color + " on Black");
    hideAnswer();
    experiment.className = "experimentVisible";
    spot.className = color + " spot";
    myTimeout = setTimeout(showGrey, 3000);
}

let showGrey = () => {
    clearTimeout(myTimeout);
    experiment.className = "experiment";
    myTimeout = setTimeout(showAnswer, 2000);
}

let hideAnswer = () => {
    answerDisplay.className = "answer";
}

let showAnswer = () => {
    if(count > 1) {
        reset.className = "resetVisible";
        repeat.className = "repeatVisible";
        answerText.innerText = answers[count];
        answerDisplay.className = "answerVisible";
        count++;
        if (count === experiments.length) {
            next.className = "next";
        }
  } else {
      answerText.innerText = answers[count];
      answerDisplay.className = "answerVisible";
      count++;
    }
  }

let experiments = ["white", "white", "white", "yellow", "blue"];

let currentExperiment = () => {
    console.log(count);
    myTimeout = setTimeout(showColor(experiments[count]), 0005);
}

answerDisplay.addEventListener("click", function(event) {
    if(event.target.innerText.toLowerCase() === "repeat") {
        hideAnswer();
        count--;
        currentExperiment();
    }
    if(event.target.innerText.toLowerCase() === "next") {
        if(count === experiments.length) {
            count = 0;
            showAnswer();     
        } else if (count > 1) {
            currentExperiment();
        } else {
            showAnswer();
        }
    }
    if(event.target.innerText.toLowerCase() === "reset") {
        count = 0;
        reset.className = "reset";
        repeat.className = "repeat";
        next.className = "nextVisible";
        showAnswer();
    }
})

document.addEventListener("keyup", function(event) {
    console.log(event.key);
    if(event.key === "Escape") {
        clearTimeout(myTimeout);
        count = 0;
        reset.className = "reset";
        repeat.className = "repeat";
        next.className = "nextVisible";
        showAnswer();
    }
})

showAnswer();
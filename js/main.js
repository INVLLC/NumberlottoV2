// when i click the mute button mute the audio
let muteButton = document.getElementById("mute");
let audio = document.getElementById("bg-music");

//add a default values to the locals storage WIN and LOSE of 0
if (localStorage.getItem("Win") === null) {
    localStorage.setItem("Win", 0);
}
if (localStorage.getItem("Lost") === null) {
    localStorage.setItem("Lost", 0);
}




if (localStorage.getItem('muted') === 'true') {

    audio.muted = true;
    muteButton.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;

} else {
    audio.muted = false;
    muteButton.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
}

muteButton.addEventListener("click", function () {

    //toggle the audio
    if (audio.muted) {
        audio.muted = false;
        muteButton.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;

        localStorage.setItem('muted', false);


    } else {
        audio.muted = true;
        muteButton.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        localStorage.setItem('muted', true);

    }

});


// level generator
const level1 = {
    level: 1,
    maxNumber: 20,
    tries: 1,

}
const level2 = {
    level: 2,
    maxNumber: 40,
    tries: 2,

}
const level3 = {
    level: 3,
    maxNumber: 60,
    tries: 3,

}
const level4 = {
    level: 4,
    maxNumber: 80,
    tries: 4,

}
const level5 = {
    level: 5,
    maxNumber: 100,
    tries: 5,

}

// //pick a random level from the array and console log it
let levels = [level1, level2, level3, level4, level5];
let randomLevel = levels[Math.floor(Math.random() * levels.length)];


// //for each tries inner HTML to the live-counter div
let triesCounter = document.getElementById("live-counter");
for (let i = 0; i < randomLevel.tries; i++) {
    triesCounter.innerHTML += `<img src="images/lives-shape.png" alt="live">`;
}


// // pick a number in the range of the level
let selectedNumber = Math.floor(Math.random() * randomLevel.maxNumber) + 1;


//change the number-selected class
let numberSelectedH1 = document.getElementsByClassName("number-selected")[0];



let tileGeneratorCanvas = document.getElementById("tile-generator")
let tileGeneratorSize = randomLevel.maxNumber;

//for loop for the number of tiles
for (let i = 0; i < tileGeneratorSize; i++) {

    //creat a buttong for each loop
    let tileButton = document.createElement("button");
    tileButton.classList.add("col", "number-box", "mx-1", "my-1");
    tileButton.setAttribute("id", i + 1);
    tileButton.setAttribute("value", i + 1);
    tileButton.innerHTML = i + 1;
    tileGeneratorCanvas.appendChild(tileButton);
}




//addeventlistener to the buttons and console log the value
let tileButtons = document.querySelectorAll(".number-box");
for (let i = 0; i < tileButtons.length; i++) {
    tileButtons[i].addEventListener("click", function () {

        //when you click on a button change the class to number-box-striked
        this.style.backgroundImage = "linear-gradient(90deg, #000, #000)";
        this.style.textDecoration = "line-through";

        //if the value of the button is equal to the selected number alert you win
        if (this.value == selectedNumber) {

            //play the winning sound
            let winningSound = document.getElementById("winning");
            winningSound.play();


            //update win in the local storage
            let win = localStorage.getItem("Win");
            win++;
            localStorage.setItem("Win", win);


            alert("You win!");
            location.reload();
        } else {
            //minus one from the randomLevel.tries
            randomLevel.tries--;
            //remove the tries img from the live counter
            triesCounter.classList.remove("live-img");
            triesCounter.innerHTML = triesCounter.innerHTML.replace(`<img src="images/lives-shape.png" alt="live">`, "");

            //play the bubble sound when click
            let bubbleSound = document.getElementById("bubble-sound");
            bubbleSound.play();

            //add a disable to the button
            this.disabled = true;

            //if the value is lower than the selected number console log "lower"
            if (this.value < selectedNumber) {
                numberSelectedH1.innerHTML = `↑`;
                // console.log("lower");
            } else {
                //if the value is higher than the selected number console log "higher"
                numberSelectedH1.innerHTML = `↓`;
                // console.log("higher");
            }







        }

        //if tries is equal to 0 alert you lose
        if (randomLevel.tries == 0) {

            //wait3 seconds then say you lose

            alert("You lose!" + " The number was " + selectedNumber);

            //update the lost in the localstorage

            let lost = localStorage.getItem("Lost");
            lost++;
            localStorage.setItem("Lost", lost);



            location.reload();

        }
    });
}


//get the value of the lost in the localstorage
let ratioLost = localStorage.getItem("Lost");
let ratioWin = localStorage.getItem("Win");

//convert string rationLost into number
let ratioLostNumber = parseInt(ratioLost);
let ratioWinNumber = parseInt(ratioWin);
let ratioPercentage = (ratioWinNumber / (ratioLostNumber + ratioWinNumber)) * 100;

let winLostRatio = document.getElementById("win-lost-ratio");

//if it equals 0 or nan then set it to 0
if (isNaN(ratioPercentage)) {
    winLostRatio.innerHTML = `N/A`;
} else {
    winLostRatio.innerHTML = `${ratioPercentage.toFixed()}%`;
}




console.log(selectedNumber);
//add the maxnumber to the id max-number
document.getElementById("max-number").innerHTML = randomLevel.maxNumber;
document.getElementById("gamelevel").innerHTML = randomLevel.level;
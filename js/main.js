//Declarations
let muteButton = document.getElementById("mute");
let audio = document.getElementById("bg-music");
let easyModeButton = document.getElementById("easy-mode");
let easyModeSVG = document.getElementById("easy-mode-off");
let numberSelectedH1 = document.getElementsByClassName("number-selected")[0];

//Adds default values to the localstorage
if (localStorage.getItem("Win") === null) {
    localStorage.setItem("Win", 0);
}
if (localStorage.getItem("Lost") === null) {
    localStorage.setItem("Lost", 0);
}
if (localStorage.getItem("Easy Mode") === null) {
    localStorage.setItem("Easy Mode", false);
}



//Persisten audio mute
if (localStorage.getItem('muted') === 'true') {

    audio.muted = true;
    muteButton.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;

} else {

    audio.muted = false;
    muteButton.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
}

//Easy-mode toggle & onLoad behavior

if (localStorage.getItem("Easy Mode") == "true") {
    
    easyModeSVG.style.display = "none";
} else {

    easyModeSVG.style.display = "block";
    
}

easyModeButton.addEventListener("click", function () {
    if (localStorage.getItem("Easy Mode") == "true") {
       
        localStorage.setItem("Easy Mode", "false");
        easyModeSVG.style.display = "block";

        let normalModeSound = document.getElementById("normal-mode-sound");
        normalModeSound.play();

    } else {

        localStorage.setItem("Easy Mode", "true");

        easyModeSVG.style.display = "none";
        
        let easyModeSound = document.getElementById("easy-mode-sound");
        easyModeSound.play();
    }
});


//Audio Toggle
muteButton.addEventListener("click", function () {
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


const levelTest = [
    {
        level: 1,
        maxNumber: 10,
        tries: 1,
    },
    {
        level: 2,
        maxNumber: 20,
        tries: 2,
    },
    {
        level: 3,
        maxNumber: 30,
        tries: 3,
    },
    {
        level: 4,
        maxNumber: 40,
        tries: 4,
    },
    {
        level: 5,
        maxNumber: 50,
        tries: 5,
    },
];

//Level generator
let randomLevel = levelTest[Math.floor(Math.random() * levelTest.length)];

//Number selector within level
let selectedNumber = Math.floor(Math.random() * randomLevel.maxNumber) + 1;

// Live count img genetor
let triesCounter = document.getElementById("live-counter");
for (let i = 0; i < randomLevel.tries; i++) {
    triesCounter.innerHTML += `<img src="images/lives-shape.png" alt="live">`;
}

// Canvas & button generator
let tileGeneratorCanvas = document.getElementById("tile-generator")
let tileGeneratorSize = randomLevel.maxNumber;

for (let i = 0; i < tileGeneratorSize; i++) {
    let tileButton = document.createElement("button");
    tileButton.classList.add("col", "number-box", "mx-1", "my-1");
    tileButton.setAttribute("id", i + 1);
    tileButton.setAttribute("value", i + 1);
    tileButton.innerHTML = i + 1;
    tileGeneratorCanvas.appendChild(tileButton);
}

//Buttons event listeners
let tileButtons = document.querySelectorAll(".number-box");
for (let i = 0; i < tileButtons.length; i++) {
    tileButtons[i].addEventListener("click", function () {

        //onClick change button class to number-box-striked
        this.style.backgroundImage = "linear-gradient(90deg, #000, #000)";
        this.style.textDecoration = "line-through";

        //Winning condition
        if (this.value == selectedNumber) {

            //Play sound
            let winningSound = document.getElementById("winning");
            winningSound.play();

            //Update localStorage
            let win = localStorage.getItem("Win");
            win++;
            localStorage.setItem("Win", win);

            //Alert player
            alert("You win!");
            location.reload();

        } else {

            //Easy mode === true
            if (localStorage.getItem("Easy Mode") == "true") {
              
                //Highlight ALL buttons except 5 up and down from selectedNumber
                for (let i = 0; i < tileButtons.length; i++) {
                    if (i < selectedNumber - 5 || i > selectedNumber + 5) {
                        tileButtons[i].style.backgroundImage = "linear-gradient(90deg, #000, #000)";
                        tileButtons[i].style.textDecoration = "line-through";
                    }
                }
                

            

               


















                // let nextValue = document.getElementById(this.value + selectedNumber + 1);
                // nextValue.style.border = "2px solid red";





            }

            //Remove live counter imgage
            randomLevel.tries--;
            triesCounter.classList.remove("live-img");
            triesCounter.innerHTML = triesCounter.innerHTML.replace(`<img src="images/lives-shape.png" alt="live">`, "");

            //Play sound
            let bubbleSound = document.getElementById("bubble-sound");
            bubbleSound.play();

            //Disable button
            this.disabled = true;

            //Player hint
            if (this.value < selectedNumber) {

                numberSelectedH1.innerHTML = `Higher`;
                numberSelectedH1.style.fontSize = "3rem";

            } else {

                numberSelectedH1.innerHTML = `Lower`;
                numberSelectedH1.style.fontSize = "3rem";

            }
        }

        //Losing condition
        if (randomLevel.tries == 0) {

            alert("You lose!" + " The number was " + selectedNumber);

            //Update localStorage

            let lost = localStorage.getItem("Lost");
            lost++;
            localStorage.setItem("Lost", lost);

            //Reload Game
            location.reload();

        }
    });
}


//Check localStorage for W/L values
let ratioLost = localStorage.getItem("Lost");
let ratioWin = localStorage.getItem("Win");

//Convert into number and display a ration %
let ratioLostNumber = parseInt(ratioLost);
let ratioWinNumber = parseInt(ratioWin);
let ratioPercentage = (ratioWinNumber / (ratioLostNumber + ratioWinNumber)) * 100;

let winLostRatio = document.getElementById("win-lost-ratio");

//Ratio error handling
if (isNaN(ratioPercentage)) {
    winLostRatio.innerHTML = `N/A`;
} else {
    winLostRatio.innerHTML = `${ratioPercentage.toFixed()}%`;
}

//Print game level and max number to screen
document.getElementById("max-number").innerHTML = randomLevel.maxNumber;
document.getElementById("gamelevel").innerHTML = randomLevel.level;






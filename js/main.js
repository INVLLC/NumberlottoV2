// when i click the mute button mute the audio
let muteButton = document.getElementById("mute");
let audio = document.getElementById("bg-music");
muteButton.addEventListener("click", function () {
   
    if (audio.muted == false) {
        audio.muted = true;
        localStorage.setItem("muted", true);

    } else {
        audio.muted = false;
        localStorage.setItem("muted", false);

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


// Console logs
console.log(selectedNumber);
console.log(randomLevel);

let tileGeneratorCanvas = document.getElementById("tile-generator")
let tileGeneratorSize = randomLevel.maxNumber;

//for loop for the number of tiles
for (let i = 0; i < tileGeneratorSize; i++) {

    //creat a buttong for each loop
    let tileButton = document.createElement("button");
    tileButton.classList.add("col", "number-box", "mx-1", "my-1");
    tileButton.setAttribute("id", i +1);
    tileButton.setAttribute("value", i +1);
    tileButton.innerHTML = i+1;
    tileGeneratorCanvas.appendChild(tileButton);
}

//addeventlistener to the buttons and console log the value
let tileButtons = document.querySelectorAll(".number-box");
for (let i = 0; i < tileButtons.length; i++) {
    tileButtons[i].addEventListener("click", function () {
        console.log(this.value);

        //when you click on a button change the class to number-box-striked
        this.style.backgroundImage = "linear-gradient(90deg, #000, #000)";
        this.style.textDecoration = "line-through";

        //if the value of the button is equal to the selected number alert you win
        if (this.value == selectedNumber) {
            alert("You win!");
            location.reload();
        } else {
            //minus one from the randomLevel.tries
            randomLevel.tries--;
            //remove the tries img from the live counter
            triesCounter.innerHTML = triesCounter.innerHTML.replace(`<img src="images/lives-shape.png" alt="live">`, ""); 
            

            console.log(randomLevel.tries)
            //add a disable to the button
            this.disabled = true;

        }

        //if tries is equal to 0 alert you lose
        if (randomLevel.tries == 0) {
            alert("You lose!");

            //reload page
            location.reload();
        }
    });
}




//add the maxnumber to the id max-number
document.getElementById("max-number").innerHTML = randomLevel.maxNumber;
document.getElementById("gamelevel").innerHTML = randomLevel.level;

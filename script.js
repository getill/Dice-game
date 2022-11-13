//------------------------ Get element variables ---------------
let newGame = document.getElementById("new-game");
let roll = document.getElementById("roll");
let hold = document.getElementById("hold");
let img = document.getElementById("img");
let globalP1 = document.getElementById("globalP1");
let roundP1 = document.getElementById("roundP1");
let globalP2 = document.getElementById("globalP2");
let roundP2 = document.getElementById("roundP2");
let backgroundTarget1 = document.getElementById("player-backgroundP1");
let backgroundTarget2 = document.getElementById("player-backgroundP2");
let GameContainer = document.querySelector(".gameContainer");
let start = document.getElementById("start");
let intro = document.getElementById("intro");
//------------------------ Game variables ---------------
let activePlayer = 1;

//----------------------------PLAYGROUND---------------------

let backgroundP1 = anime({
  targets: backgroundTarget1,
  translateX: "-50vw",
  autoplay: false,
  backgroundColor: "#FFC857",
  loop: 0,
});
let backgroundP2 = anime({
  targets: backgroundTarget2,
  translateX: "50vw",
  autoplay: false,
  backgroundColor: "#119da4",
  loop: 0,
});

//------------------ Functions used later ---------------

// Switch the player display depending on the situation
function switchPlayer() {
  if (activePlayer == 1) {
    player1.style.opacity = "1";
    player2.style.opacity = "0.3";
  } else {
    player1.style.opacity = "0.3";
    player2.style.opacity = "1";
  }
}

let gameReset = () => {
  // rewrite everything to "0"
  roundP1.textContent = "0";
  globalP1.textContent = "0";
  roundP2.textContent = "0";
  globalP2.textContent = "0";
  // Force player one display
  activePlayer = 1;
  switchPlayer();
  backgroundP1.play();
  backgroundTarget1.style.opacity = "1";
  backgroundTarget2.style.opacity = "0";
};

//--------------------- Main functions ----------------------
start.addEventListener("click", () => {
  backgroundP1.play();
  backgroundTarget1.style.opacity = "1";
  intro.remove();
  anime({
    targets: GameContainer,
    translateY: 0,
    delay: 1000,
  });
});
window.addEventListener("load", () => {
  backgroundTarget1.style.opacity = "1";
  anime({
    targets: GameContainer,
    translateY: [0, "-100vw"],
  });
  anime({
    targets: intro,
    translateY: ["-100vw", "50vh"],
  });
});

// Roll logic
let rollfunction = () => {
  // Generates a random number between 1 to 6
  let diceNumber = Math.floor(Math.random() * 6) + 1;
  // Generate a string with the img path, including a random number between then display the img
  let randomImg = "images/" + diceNumber + ".png";
  // Used to get the img element then set the src attribute to randomImg (= images/1.png or any other numbers)
  document.querySelector("img").setAttribute("src", randomImg);

  if (activePlayer == 1 && diceNumber > 1) {
    roll.textContent = "ROLL DICE !";
    // puts the number into the current score
    let totalCurrentP1 = roundP1.textContent;
    // I had to put a "+" to make the addition possible beacause rounsP2.textContent is a string, the + is here to convert a string into a number
    roundP1.textContent = +totalCurrentP1 + +diceNumber;
    switchPlayer();
  } else if (activePlayer == 1 && diceNumber == 1) {
    backgroundP2.play();
    backgroundTarget1.style.opacity = "0";
    backgroundTarget2.style.opacity = "1";
    // Switch player if dice = 1
    roll.textContent = "NEXT PLAYER";
    roundP1.textContent = "0";
    activePlayer = activePlayer + 1;
    switchPlayer();
  } else if (activePlayer == 2 && diceNumber > 1) {
    // Put score into P2 section
    roll.textContent = "ROLL DICE !";
    let totalCurrentP2 = roundP2.textContent;
    roundP2.textContent = +totalCurrentP2 + +diceNumber;
  } else {
    backgroundP1.play();
    backgroundTarget2.style.opacity = "0";
    backgroundTarget1.style.opacity = "1";
    // Switch to player 1 if player 2 get "1"
    roundP2.textContent = "0";
    roll.textContent = "NEXT PLAYER";
    activePlayer = activePlayer - 1;
  }
};

// Hold ogic
let holdFunction = () => {
  let totalGlobalP1 = globalP1.textContent;
  let totalGlobalP2 = globalP2.textContent;
  let numberRoundP1 = roundP1.textContent;
  let numberRoundP2 = roundP2.textContent;
  if (activePlayer == 1 && +totalGlobalP1 + +numberRoundP1 < 100) {
    globalP1.textContent = +totalGlobalP1 + +roundP1.textContent;
    roundP1.textContent = "0";
    activePlayer = 2;
    backgroundP2.play();
    backgroundTarget1.style.opacity = "0";
    backgroundTarget2.style.opacity = "1";
    switchPlayer();
  } else if (activePlayer == 1 && +totalGlobalP1 + +numberRoundP1 >= 100) {
    activePlayer = 1;
    alert("P1 t'as gagné mon pote !");
    gameReset();
  } else if (activePlayer == 2 && +totalGlobalP2 + +numberRoundP2 < 100) {
    globalP2.textContent = +totalGlobalP2 + +roundP2.textContent;
    roundP2.textContent = "0";
    activePlayer = 1;
    switchPlayer();
    backgroundP1.play();
    backgroundTarget2.style.opacity = "0";
    backgroundTarget1.style.opacity = "1";
  } else if (activePlayer == 2 && +totalGlobalP2 + +numberRoundP2 >= 100) {
    activePlayer = 2;
    alert(
      "Le joueur 2 a gagné cette manche ! (De toute façon c'était mon préféré"
    );
    gameReset();
  }
};

//--------------------- Buttons ----------------------------
// Every buttons holding every functions
hold.addEventListener("click", () => {
  holdFunction();
});

roll.addEventListener("click", () => {
  rollfunction();
});

newGame.addEventListener("click", () => {
  gameReset();
});

//------------------------Get element variables---------------
let newGame = document.getElementById("new-game");
let roll = document.getElementById("roll");
let hold = document.getElementById("hold");
let img = document.getElementById("img");
let globalP1 = document.getElementById("globalP1");
let roundP1 = document.getElementById("roundP1");
let globalP2 = document.getElementById("globalP2");
let roundP2 = document.getElementById("roundP2");

//------------------------Game variables---------------
let activePlayer = 1;

function switchPlayer() {
  if (activePlayer == 1) {
    player1.style.opacity = "1";
    player2.style.opacity = "0.3";
  } else {
    player1.style.opacity = "0.3";
    player2.style.opacity = "1";
  }
}

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
    // I had to put a "+" to make the addition possible beacause rounsP2.textContent is a string
    roundP1.textContent = +totalCurrentP1 + +diceNumber;
    switchPlayer();
  } else if (activePlayer == 1 && diceNumber == 1) {
    // Switch player if dice = 1
    roll.textContent = "You loose !";
    roundP1.textContent = "0";
    activePlayer = activePlayer + 1;
    switchPlayer();
  } else if (activePlayer == 2 && diceNumber > 1) {
    // Put score into P2 section
    roll.textContent = "ROLL DICE !";
    let totalCurrentP2 = roundP2.textContent;
    roundP2.textContent = +totalCurrentP2 + +diceNumber;
  } else {
    // Switch to player 1 if player 2 get "1"
    roundP2.textContent = "0";
    roll.textContent = "You loose !";
    activePlayer = activePlayer - 1;
  }
};

hold.addEventListener("click", () => {
  let totalGlobal = globalP1.textContent;
  globalP1.textContent = +totalGlobal + +roundP1.textContent;
  roundP1.textContent = "0";
  console.log("HOLD");
});

roll.addEventListener("click", () => {
  rollfunction();
});

newGame.addEventListener("click", () => {
  console.log("NEW GAME");
});

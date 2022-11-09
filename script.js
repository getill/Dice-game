//------------------------ Variables---------------
let newGame = document.getElementById("new-game");
let roll = document.getElementById("roll");
let hold = document.getElementById("hold");
let img = document.getElementById("img");
let center = document.getElementById("center");
let roundP1 = document.getElementById("roundP1");
let roundP2 = document.getElementById("roundP2");
let globalP1 = document.getElementById("globalP1");

let player = "p1";
function switchPlayer(currentPlayer) {
  if (currentPlayer === "p1") {
    player = "p2";
  } else {
    player = "p1";
  }
}

let randomNumber = () => {
  return Math.floor(Math.random() * 6) + 1;
};

// P1 roll logic
let rollfunction = () => {
  // Generates a random number between 1 to 6
  let diceNumber = randomNumber();
  // Generate a string with the img path, including a random number between
  let randomImg = "images/" + diceNumber + ".png";

  if (diceNumber > 1) {
    // puts the number into the current score
    let totalCurrent = roundP1.textContent;
    // Used to get the img element then set the src attribute to randomImg (= images/1.png or any other numbers)
    document.querySelector("img").setAttribute("src", randomImg);
    // I had to put a "+" to make the addition possible beacause rounsP2.textContent is a string
    roundP1.textContent = +totalCurrent + +diceNumber;
  } else {
    // Switch player logic
    switchPlayer(player);
    console.log(player);
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

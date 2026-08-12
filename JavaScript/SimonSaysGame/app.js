// 1. DOM SELECTORS & STATE VARIABLES

const h2 = document.querySelector("h2");
const allBtns = document.querySelectorAll(".btn");
const btns = ["green", "red", "yellow", "blue"];

let gameSeq = [];
let playerSeq = [];
let gameStart = false;
let level = 0;
let highScore = 0;

// 2. CORE GAME LOGIC

function levelup() {
  playerSeq = [];
  level++;
  h2.innerText = `LEVEL ${level}`;

  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIndex];
  let randomBtn = document.querySelector(`.${randomColor}`);

  gameSeq.push(randomColor);
  btnFlash(randomBtn);
}

function checkAns(idx) {
  if (playerSeq[idx] === gameSeq[idx]) {
    // If player finished the current sequence, progress to the next level
    if (playerSeq.length === gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    // Game Over Logic
    let currentScore = level - 1;

    if (currentScore > highScore) {
      highScore = currentScore;
    }

    h2.innerHTML = `Game Over! Your Score: <b>${currentScore}</b> <br> High Score: <b>${highScore}</b> <br> Press any key to restart.`;

    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 150);

    reset();
  }
}

function reset() {
  gameStart = false;
  gameSeq = [];
  playerSeq = [];
  level = 0;
}

// 3. UI & HANDLER FUNCTIONS

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function btnPress() {
  if (!gameStart) return;

  let btn = this;
  btnFlash(btn);

  let playerColor = btn.getAttribute("id");
  playerSeq.push(playerColor);

  checkAns(playerSeq.length - 1);
}

// 4. EVENT LISTENERS

// Keypress listener to start/restart the game
document.addEventListener("keypress", function () {
  if (gameStart === false) {
    gameStart = true;
    console.log("Game Started");
    setTimeout(levelup, 200);
  }
});

// Click listeners for color buttons
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

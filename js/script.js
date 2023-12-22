const icons = [
  "fas fa-sun",
  "fas fa-bicycle",
  "fas fa-bolt",
  "fas fa-bomb",
  "fas fa-cube",
  "fas fa-leaf",
  "fas fa-paper-plane",
  "fas fa-car",
  "fas fa-house",
  "fas fa-train",
  "fas fa-cat",
  "fas fa-dog",
  "fas fa-pen",
  "fas fa-tree",
  "fas fa-chair",
  "fas fa-tv",
  "fas fa-glasses",
  "fas fa-rocket",
];

const gameBoard = document.querySelector(".game-board");
const cards = [...icons, ...icons];
let firstCard, secondCard;
let flippedCards = 0;
let lockBoard = false;
let playerScores = [0, 0];
let currentPlayer = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(icon) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"><i class="${icon}"></i></div>
      <div class="card-back"></div>
    </div>`;
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (
    firstCard.querySelector(".card-front i").className ===
    secondCard.querySelector(".card-front i").className
  ) {
    disableCards();
    return;
  }

  unflipCards();
}

function switchPlayer() {
  // Remove highlight from the current player
  document
    .getElementById(`player${currentPlayer + 1}Score`)
    .classList.remove("active-player");

  currentPlayer = 1 - currentPlayer; // Switch between 0 and 1

  // Add highlight to the new current player
  document
    .getElementById(`player${currentPlayer + 1}Score`)
    .classList.add("active-player");
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  // Increment current player's score
  playerScores[currentPlayer]++;

  // Fetch the current player's name from their score display
  const playerName = document
    .getElementById(`player${currentPlayer + 1}Score`)
    .textContent.split(":")[0];

  // Update score display with the correct player name and new score
  document.getElementById(
    `player${currentPlayer + 1}Score`
  ).textContent = `${playerName}: ${playerScores[currentPlayer]}`;

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    switchPlayer(); // Switch player if no match was found
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function init() {
  const shuffledCards = shuffle(cards);
  shuffledCards.forEach((icon) => {
    const card = createCard(icon);
    gameBoard.appendChild(card);
  });

  // Initialize highlight for the first player
  document.getElementById("player1Score").classList.add("active-player");
  document.getElementById("player2Score").classList.remove("active-player");
}

function handleSubmit() {
  // Get player names
  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;

  // Update score text
  document.getElementById("player1Score").textContent = player1Name + ": 0";
  document.getElementById("player2Score").textContent = player2Name + ": 0";

  // Hide input fields and submit button
  document.getElementById("player1").style.display = "none";
  document.getElementById("player2").style.display = "none";
  document.getElementById("submitBtn").style.display = "none";
  document.getElementById("labelEnterNames").style.display = "none";

  // Show reset button
  document.getElementById("resetGameBtn").style.display = "inline-block";
}

function handleReset() {
  // Keep player names
  const player1Name = document
    .getElementById("player1Score")
    .textContent.split(":")[0];
  const player2Name = document
    .getElementById("player2Score")
    .textContent.split(":")[0];

  // Reset scores to 0
  document.getElementById("player1Score").textContent = player1Name + ": 0";
  document.getElementById("player2Score").textContent = player2Name + ": 0";

  // Reset player scores and current player
  playerScores = [0, 0];
  currentPlayer = 0;

  // Reset the board
  resetBoard();

  // Reset highlights
  document.getElementById("player1Score").classList.add("active-player");
  document.getElementById("player2Score").classList.remove("active-player");
}

function resetGame() {
  // Reset player scores and current player
  playerScores = [0, 0];
  currentPlayer = 0;

  // Reset score text to default
  document.getElementById("player1Score").textContent = "Player 1: 0";
  document.getElementById("player2Score").textContent = "Player 2: 0";

  // Clear the player name inputs and make them visible
  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");
  player1Input.value = "";
  player2Input.value = "";
  player1Input.style.display = "inline-block";
  player2Input.style.display = "inline-block";

  // Show the submit button, Enter Names label, and hide the reset game button
  document.getElementById("submitBtn").style.display = "inline-block";
  document.getElementById("labelEnterNames").style.display = "inline-block";
  document.getElementById("resetGameBtn").style.display = "none";

  // Remove all cards from the game board
  while (gameBoard.firstChild) {
    gameBoard.firstChild.remove();
  }

  // Re-initialize the game
  init();

  // Reset highlights
  document.getElementById("player1Score").classList.add("active-player");
  document.getElementById("player2Score").classList.remove("active-player");
}

const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

init(); // Start the game

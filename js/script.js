const icons = [
  "fas fa-sun",
  "fas fa-bicycle",
  "fas fa-bolt",
  "fas fa-bomb",
  "fas fa-cube",
  "fas fa-leaf",
  "fas fa-paper-plane",
  "fas fa-star",
];

const gameBoard = document.querySelector(".game-board");
const cards = [...icons, ...icons];
let firstCard, secondCard;
let flippedCards = 0;
let lockBoard = false;

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

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

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
}

init();
function handleSubmit() {
  // Get player names
  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;

  // Update label text
  document.getElementById("player1Label").textContent = player1Name;
  document.getElementById("player2Label").textContent = player2Name;

  // Update score text
  document.getElementById("player1Score").textContent = player1Name + ": 0";
  document.getElementById("player2Score").textContent = player2Name + ": 0";

  // Hide input fields and submit button
  document.getElementById("player1").style.display = "none";
  document.getElementById("player2").style.display = "none";
  document.getElementById("submitBtn").style.display = "none";

  // Show reset button
  document.getElementById("resetBtn").style.display = "inline-block";
}

function handleReset() {
  // Reset label text
  document.getElementById("player1Label").textContent = "Player 1:";
  document.getElementById("player2Label").textContent = "Player 2:";

  // Reset score text
  document.getElementById("player1Score").textContent = "Player 1: 0";
  document.getElementById("player2Score").textContent = "Player 2: 0";

  // Show input fields and submit button
  document.getElementById("player1").style.display = "inline-block";
  document.getElementById("player2").style.display = "inline-block";
  document.getElementById("submitBtn").style.display = "inline-block";

  // Hide reset button
  document.getElementById("resetBtn").style.display = "none";
}
let playerScores = [0, 0];
let currentPlayer = 0;

function switchPlayer() {
  currentPlayer = 1 - currentPlayer; // Switch between 0 and 1
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  // Increment current player's score
  playerScores[currentPlayer]++;

  // Update score display
  document.getElementById(`player${currentPlayer + 1}Score`).textContent = `${
    document.getElementById(`player${currentPlayer + 1}Label`).textContent
  }: ${playerScores[currentPlayer]}`;

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

function handleSubmit() {
  // Get player names
  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;

  // Update label text
  document.getElementById("player1Label").textContent = player1Name;
  document.getElementById("player2Label").textContent = player2Name;

  // Update score text
  document.getElementById("player1Score").textContent = player1Name + ": 0";
  document.getElementById("player2Score").textContent = player2Name + ": 0";

  // Reset player scores and current player
  playerScores = [0, 0];
  currentPlayer = 0;

  // Remaining code...
}

function handleReset() {
  // Reset label text
  document.getElementById("player1Label").textContent = "Player 1:";
  document.getElementById("player2Label").textContent = "Player 2:";

  // Reset score text
  document.getElementById("player1Score").textContent = "Player 1: 0";
  document.getElementById("player2Score").textContent = "Player 2: 0";

  // Reset player scores and current player
  playerScores = [0, 0];
  currentPlayer = 0;

  // Remaining code...
}

function resetGame() {
  // Reset player scores
  playerScores = [0, 0];
  currentPlayer = 0;

  // Reset score text
  document.getElementById("player1Score").textContent = "Player 1: 0";
  document.getElementById("player2Score").textContent = "Player 2: 0";

  // Remove all cards from the game board
  while (gameBoard.firstChild) {
    gameBoard.firstChild.remove();
  }

  // Re-initialize the game
  init();
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

function flipCard() {
  // Get player names
  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;

  if (!player1Name || !player2Name) {
    modal.style.display = "block";
    return;
  }

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

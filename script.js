let x_class = "X";
let o_class = "O";
let x_turn = true;

const winning_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const allCells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const winning_message = document.querySelector(".winning-message");
const winning_message_text = document.querySelector(".winning-message-text");
const btn = document.getElementById("btn");

startGame();

function startGame() {
  allCells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
}

const audio = new Audio('music.mp3');

function handleClick(e) {
    audio.play();
  const cell = e.target;
  const currentClass = x_turn ? x_class : o_class;
  cell.classList.add(currentClass);
  if (checkWin(currentClass)) {
    showWinner(false);
  } else if (isDraw()) {
    showWinner(true);
  } else {
    swapTurn();
  }
}

function swapTurn() {
  x_turn = !x_turn;
}

function checkWin(currentClass) {
  return winning_conditions.some((combination) => {
    return combination.every((indx) => {
      return allCells[indx].classList.contains(currentClass);
    });
  });
}

function showWinner() {
  if (isDraw()) {
    winning_message.classList.add("show");
    winning_message_text.innerHTML = "Draw";
    audio.pause();
} else {
    winning_message_text.innerHTML = `Winner is ${x_turn ? x_class : o_class}!`;
    winning_message.classList.add("show");
    audio.pause();
  }
}

function isDraw() {
  return [...allCells].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
}

btn.addEventListener("click", () => {
  winning_message.classList.remove("show");
  location.reload();
});

import Gameboard from './gameboard';
import Ship from './ship';
import Player from './player';

function setupingBoard(value) {
  playerBoard.clearBoard();
  removeGridElements('playerBoard');
  placeAllShips(value);
  createGridElements('playerBoard');
}

function createGridElements(id) {
  const board = document.getElementById(id);
  board.style.gridTemplateColumns = `repeat(10, 1fr)`;
  board.style.gridTemplateRows = `repeat(10, 1fr)`;
  for (let i = 0; i < 10 * 10; i += 1) {
    const gridElement = document.createElement('button');
    gridElement.classList.add(`${id}-grid-element`);
    gridElement.dataset.coord = i;
    if (playerBoard.boardInfo.board[i].ship !== false && id === 'playerBoard')
      gridElement.style.backgroundColor = 'pink';
    board.append(gridElement);
  }
}

function removeGridElements(id) {
  const board = document.getElementById(id);
  board.innerHTML = '';
}

function validateShip(ship, num, board) {
  if (ship.isVertical === true) {
    if (num + ship.length * 10 > 100) return false;
    for (let i = 0; i < ship.length; i += 1)
      if (board[num + i * 10].ship !== false) return false;
  } else if (ship.isVertical === false) {
    if (num % 10 > (num + ship.length) % 10) return false;
    for (let i = 0; i < ship.length; i += 1)
      if (board[num + i].ship !== false) return false;
  } else return -1;
  return true;
}

function placeAllShips(value) {
  if (value === 'ai') {
    const aiShips = [
      carrierAI,
      battleshipAI,
      destroyerAI,
      submarineAI,
      patrolboatAI,
    ];
    for (let i = 0; i < 5; i += 1) {
      const randomNum = ai.getRandomNum(100);
      if (
        validateShip(aiShips[i], randomNum, aiBoard.boardInfo.board) === false
      )
        i -= 1;
      else aiBoard.placeShip(aiShips[i], randomNum);
    }
  } else if (value === 'human') {
    const playerShips = [carrier, battleship, destroyer, submarine, patrolboat];
    for (let i = 0; i < 5; i += 1) {
      const randomNum = player.getRandomNum(100);
      if (
        validateShip(playerShips[i], randomNum, playerBoard.boardInfo.board) ===
        false
      )
        i -= 1;
      else playerBoard.placeShip(playerShips[i], randomNum);
    }
  } else return -1;
}

function aiMove() {
  const buttons = document.querySelectorAll('.playerBoard-grid-element');
  const aiShotCoord = ai.AI(playerBoard.boardInfo.lastShot);
  playerBoard.receiveHit(aiShotCoord);
  if (
    playerBoard.boardInfo.lastShot.hit === true &&
    playerBoard.boardInfo.lastShot.location === aiShotCoord
  )
    buttons[aiShotCoord].style.backgroundColor = 'red';
  else buttons[aiShotCoord].style.backgroundColor = 'lightgrey';
  if (playerBoard.boardInfo.shipsLeft === false) {
    document.getElementById('endgame').style.display = 'flex';
    document.getElementById('winnerText').innerHTML = 'AI wins!';
    document.getElementById('playerSide').style.display = 'none';
    document.getElementById('enemySide').style.display = 'none';
  }
}

function verticalOrHorizontal() {
  const randomNum = player.getRandomNum(2);
  if (randomNum === 1) return false;
  if (randomNum === 0) return true;
  return -1;
}

/*
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', (e) => {
  document.getElementById('playerName').innerHTML = `${
    document.getElementById('nameInput').value
  }'s Board`;
  setupingBoard(player.playerInfo.name);
  document.getElementById('playerSide').style.display = 'flex';
  document.getElementById('addShips').style.display = 'flex';
  document.getElementById('nameSelection').style.display = 'none';
  e.preventDefault();
});
*/

const randomButton = document.getElementById('randomButton');
randomButton.addEventListener('click', (e) => {
  setupingBoard(player.playerInfo.name);
  document.getElementById('playButton').style.display = 'flex';
  e.preventDefault();
});

const playButton = document.getElementById('playButton');
playButton.addEventListener('click', (e) => {
  createGridElements('enemyBoard');
  document.getElementById('enemySide').style.display = 'flex';
  document.getElementById('addShips').style.display = 'none';
  boardButtons();
  // console.table(playerBoard.boardInfo.board);
  // console.table(aiBoard.boardInfo.board);
  e.preventDefault();
});

const playAgainButton = document.getElementById('playAgainButton');
playAgainButton.addEventListener('click', () => {
  window.location.reload(true);
});

function boardButtons() {
  const buttons = document.querySelectorAll('.enemyBoard-grid-element');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      aiBoard.receiveHit(button.dataset.coord);
      if (
        aiBoard.boardInfo.lastShot.hit === true &&
        aiBoard.boardInfo.lastShot.location === button.dataset.coord
      )
        button.style.backgroundColor = 'red';
      else button.style.backgroundColor = 'lightgrey';
      if (aiBoard.boardInfo.shipsLeft === false) {
        document.getElementById('endgame').style.display = 'flex';
        document.getElementById('winnerText').innerHTML = 'You win!';
        document.getElementById('playerSide').style.display = 'none';
        document.getElementById('enemySide').style.display = 'none';
      } else aiMove();
      e.target.disabled = true;
    });
  });
}

const playerBoard = Gameboard('human');
const aiBoard = Gameboard('ai');
const player = Player('human');
const ai = Player('ai');

const carrier = Ship('USS Enterprise', 5, verticalOrHorizontal());
const battleship = Ship('Minneapolis', 4, verticalOrHorizontal());
const destroyer = Ship('Anderson', 3, verticalOrHorizontal());
const submarine = Ship('Nautilus', 3, verticalOrHorizontal());
const patrolboat = Ship('PT-20', 2, verticalOrHorizontal());

const carrierAI = Ship('Akagi', 5, verticalOrHorizontal());
const battleshipAI = Ship('Nagato', 4, verticalOrHorizontal());
const destroyerAI = Ship('Murakumo', 3, verticalOrHorizontal());
const submarineAI = Ship('I-68', 3, verticalOrHorizontal());
const patrolboatAI = Ship('Shimakaze', 2, verticalOrHorizontal());

placeAllShips(ai.playerInfo.name);
createGridElements('playerBoard');

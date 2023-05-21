import { playerBoard, aiBoard, player } from './index';
import { placeAllShips, addEventListenerToGridElement, aiMove } from './game';

function setupingBoard(value) {
  playerBoard.clearBoard();
  removeGridElements(playerBoard.boardInfo.owner);
  placeAllShips(value);
  createGridElements(playerBoard.boardInfo.owner);
}

function createGridElements(id) {
  const board = document.getElementById(id);
  board.style.gridTemplateColumns = `repeat(10, 1fr)`;
  board.style.gridTemplateRows = `repeat(10, 1fr)`;
  for (let i = 0; i < 10 * 10; i += 1) {
    const gridElement = document.createElement('button');
    gridElement.classList.add(`${id}-grid-element`);
    gridElement.dataset.coord = i;
    addEventListenerToGridElement(gridElement);

    if (playerBoard.boardInfo.board[i].ship !== false && id === 'playerBoard')
      gridElement.style.backgroundColor = '#8d99ae';
    board.append(gridElement);
  }
}

function removeGridElements(id) {
  const board = document.getElementById(id);
  board.innerHTML = '';
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
  document.getElementById('ships').style.display = 'none';
  document.getElementById('verticalOrHorizontal').style.display = 'none';
  e.preventDefault();
});

const verticalOrHorizontalButton = document.getElementById(
  'verticalOrHorizontalButton'
);
verticalOrHorizontalButton.addEventListener('click', (e) => {
  if (e.target.innerHTML === 'Vertical') {
    const children = document.querySelectorAll('#ship > *');
    children.forEach((child) => {
      child.style.flexDirection = 'column';
    });
    e.target.innerHTML = 'Horizontal';
  } else {
    const children = document.querySelectorAll('#ship > *');
    children.forEach((child) => {
      child.style.flexDirection = 'row';
    });
    e.target.innerHTML = 'Vertical';
  }
  e.preventDefault();
});

const shipHTML = document.querySelector('#ship');
const shipsHTML = shipHTML.querySelectorAll(':scope > *');
const shipsArray = Array.from(shipsHTML);

shipsHTML.forEach((element) => {
  element.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

const cursorsButtons = document.querySelectorAll('.cursors > button');
cursorsButtons.forEach((button) => {
  let displayedShip;
  let nextShip;
  button.addEventListener('click', () => {
    displayedShip = shipsArray.find(
      (element) => element.style.display === 'flex'
    );
    if (button.id === 'left-cursor') {
      nextShip =
        shipsArray[
          (shipsArray.indexOf(displayedShip) - 1 + shipsArray.length) %
            shipsArray.length
        ];
    } else if (button.id === 'right-cursor') {
      nextShip =
        shipsArray[(shipsArray.indexOf(displayedShip) + 1) % shipsArray.length];
    }
    displayedShip.style.display = 'none';
    nextShip.style.display = 'flex';
  });
});

const playButton = document.getElementById('playButton');
playButton.addEventListener('click', (e) => {
  createGridElements(aiBoard.boardInfo.owner);
  document.getElementById('enemySide').style.display = 'flex';
  document.getElementById('addShips').style.display = 'none';
  boardButtons();
  // console.table(playerBoard.boardInfo.board);
  // console.table(aiBoard.boardInfo.board);
  e.preventDefault();
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

export { setupingBoard, createGridElements, shipsHTML, shipsArray };

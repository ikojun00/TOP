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
    gridElement.addEventListener('dragover', (e) => {
      e.preventDefault();
      gridElement.classList.add('dragover');
    });

    gridElement.addEventListener('drop', (e) => {
      const isVertical =
        document.getElementById('verticalOrHorizontalButton').innerHTML ===
        'Vertical';
      const shipMap = {
        carrier: {
          ship: isVertical
            ? Ship('USS Enterprise', 5)
            : Ship('USS Enterprise', 5, true),
          index: 0,
        },
        battleship: {
          ship: isVertical
            ? Ship('Minneapolis', 4)
            : Ship('Minneapolis', 4, true),
          index: 1,
        },
        destroyer: {
          ship: isVertical ? Ship('Anderson', 3) : Ship('Anderson', 3, true),
          index: 2,
        },
        submarine: {
          ship: isVertical ? Ship('Nautilus', 3) : Ship('Nautilus', 3, true),
          index: 3,
        },
        patrolboat: {
          ship: isVertical ? Ship('PT-20', 2) : Ship('PT-20', 2, true),
          index: 4,
        },
      };
      const data = e.dataTransfer.getData('text/plain');
      const { ship, index } = shipMap[data];
      console.log(ship);
      if (
        validateShip(
          ship,
          Number(e.target.dataset.coord),
          playerBoard.boardInfo.board
        ) === true
      ) {
        playerBoard.placeShip(ship, Number(e.target.dataset.coord));
        if (ship.isVertical) {
          for (let j = 0; j < ship.length; j += 1) {
            const item = document.querySelector(
              `[data-coord = "${Number(gridElement.dataset.coord) + j * 10}"]`
            );
            item.style.backgroundColor = '#8d99ae';
          }
        } else {
          for (let j = 0; j < ship.length; j += 1) {
            const item = document.querySelector(
              `[data-coord = "${Number(gridElement.dataset.coord) + j}"]`
            );
            item.style.backgroundColor = '#8d99ae';
          }
        }
        shipsHTML[
          (index + shipsHTML.length + 1) % shipsHTML.length
        ].style.display = 'flex';
        shipsHTML[(index + shipsHTML.length) % shipsHTML.length].style.display =
          'none';
        const element = document.getElementById(data);
        shipsArray.splice(shipsArray.indexOf(element), 1);
        element.remove();
        gridElement.classList.remove('dragover');
        if (shipsArray.length === 0) {
          document.getElementById('playButton').style.display = 'flex';
          document.getElementById('ships').style.display = 'none';
          document.getElementById('verticalOrHorizontal').style.display =
            'none';
        }
      }
      console.table(playerBoard.boardInfo.board);
    });
    if (playerBoard.boardInfo.board[i].ship !== false && id === 'playerBoard')
      gridElement.style.backgroundColor = '#8d99ae';
    board.append(gridElement);
  }
}

function removeGridElements(id) {
  const board = document.getElementById(id);
  board.innerHTML = '';
}

function validateShip(ship, num, board) {
  if (ship.isVertical === true) {
    if (num + (ship.length - 1) * 10 > 100) return false;
    for (let i = 0; i < ship.length; i += 1)
      if (board[num + i * 10].ship !== false) return false;
  } else if (ship.isVertical === false) {
    if (num % 10 > (num + ship.length - 1) % 10) return false;
    for (let i = 0; i < ship.length; i += 1)
      if (board[num + i].ship !== false) return false;
  } else return -1;
  return true;
}

function placeAllShips(value) {
  const carrier = Ship('USS Enterprise', 5, verticalOrHorizontal());
  const battleship = Ship('Minneapolis', 4, verticalOrHorizontal());
  const destroyer = Ship('Anderson', 3, verticalOrHorizontal());
  const submarine = Ship('Nautilus', 3, verticalOrHorizontal());
  const patrolboat = Ship('PT-20', 2, verticalOrHorizontal());
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

const carrierAI = Ship('Akagi', 5, verticalOrHorizontal());
const battleshipAI = Ship('Nagato', 4, verticalOrHorizontal());
const destroyerAI = Ship('Murakumo', 3, verticalOrHorizontal());
const submarineAI = Ship('I-68', 3, verticalOrHorizontal());
const patrolboatAI = Ship('Shimakaze', 2, verticalOrHorizontal());

placeAllShips(ai.playerInfo.name);
createGridElements('playerBoard');

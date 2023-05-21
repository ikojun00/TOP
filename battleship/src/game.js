import Ship from './ship';
import { shipsHTML, shipsArray } from './DOM';
import {
  playerBoard,
  aiBoard,
  player,
  ai,
  carrierAI,
  battleshipAI,
  destroyerAI,
  submarineAI,
  patrolboatAI,
} from './index';

function addEventListenerToGridElement(gridElement) {
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
      },
      battleship: {
        ship: isVertical
          ? Ship('Minneapolis', 4)
          : Ship('Minneapolis', 4, true),
      },
      destroyer: {
        ship: isVertical ? Ship('Anderson', 3) : Ship('Anderson', 3, true),
      },
      submarine: {
        ship: isVertical ? Ship('Nautilus', 3) : Ship('Nautilus', 3, true),
      },
      patrolboat: {
        ship: isVertical ? Ship('PT-20', 2) : Ship('PT-20', 2, true),
      },
    };
    const data = e.dataTransfer.getData('text/plain');
    const { ship } = shipMap[data];
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

      const element = document.getElementById(data);
      shipsArray[
        (shipsArray.indexOf(element) + shipsArray.length + 1) %
          shipsArray.length
      ].style.display = 'flex';
      shipsArray[
        shipsArray.indexOf(element) + (shipsArray.length % shipsArray.length)
      ].style.display = 'none';
      shipsArray.splice(shipsArray.indexOf(element), 1);
      console.log(shipsArray);
      element.remove();
      gridElement.classList.remove('dragover');
      if (shipsArray.length === 0) {
        document.getElementById('playButton').style.display = 'flex';
        document.getElementById('ships').style.display = 'none';
        document.getElementById('verticalOrHorizontal').style.display = 'none';
      }
    }
  });
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

const playAgainButton = document.getElementById('playAgainButton');
playAgainButton.addEventListener('click', () => {
  window.location.reload(true);
});

export {
  addEventListenerToGridElement,
  validateShip,
  verticalOrHorizontal,
  placeAllShips,
  aiMove,
};

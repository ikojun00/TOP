import Gameboard from './gameboard';
import Ship from './ship';

test('board should contain 100 elements', () => {
  const board = Gameboard('player');
  expect(board.boardInfo.board.length).toBe(100);
});

test('place horizontal ships', () => {
  const board = Gameboard('player');

  const checkHorizontalShip = (ship, startCoord) => {
    board.placeShip(ship, startCoord);
    for (let i = startCoord; i < startCoord + ship.length; i += 1) {
      expect(board.boardInfo.board[i].ship).toBe(ship.id);
    }
  };

  const firstShip = Ship('midway', 3);
  checkHorizontalShip(firstShip, 1);

  const secondShip = Ship('pearl', 5);
  checkHorizontalShip(secondShip, 69);
});

test('place vertical ships', () => {
  const board = Gameboard('player');

  const checkVerticalSip = (ship, startCoord) => {
    board.placeShip(ship, startCoord);
    for (let i = startCoord; i < startCoord + ship.length * 10; i += 10) {
      expect(board.boardInfo.board[i].ship).toBe(ship.id);
    }
  };

  const firstShip = Ship('midway', 5, true);
  checkVerticalSip(firstShip, 1);

  const secondShip = Ship('pearl', 5, true);
  checkVerticalSip(secondShip, 42);
});

test('ship received a hit', () => {
  const board = Gameboard('player');

  const checkHit = (ship, startCoord) => {
    board.placeShip(ship, startCoord);
    board.receiveHit(startCoord + 2);
    expect(board.boardInfo.lastShot.hit).toBe(true);
  };

  const firstShip = Ship('midway', 5);
  checkHit(firstShip, 1);
});

test('all ships sunk', () => {
  const board = Gameboard('player');

  const sinkAllShips = (ship, startCoord) => {
    board.placeShip(ship, startCoord);
    for (let i = startCoord; i < startCoord + ship.length; i += 1) {
      board.receiveHit(i);
    }
  };

  const firstShip = Ship('midway', 5);
  sinkAllShips(firstShip, 1);

  const secondShip = Ship('pearl', 5);
  sinkAllShips(secondShip, 42);

  board.allShipsSunk();
  expect(board.boardInfo.shipsLeft).toBe(false);
});

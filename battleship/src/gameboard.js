const Gameboard = (ownerName) => {
  const boardInfo = {
    board: [],
    shipsLeft: true,
    owner: ownerName,
    lastShot: {
      hit: false,
      location: false,
    },
  };

  const fillBoard = () => {
    for (let i = 0; i < 100; i += 1) {
      boardInfo.board.push({ ship: false, beenHit: false });
    }
  };

  const clearBoard = () => {
    for (let i = 0; i < 100; i += 1) {
      boardInfo.board[i] = { ship: false, beenHit: false };
    }
  };

  if (boardInfo.board.length === 0) {
    fillBoard();
  }

  const placeShip = (ship, startCoord) => {
    if (ship.isVertical) {
      for (let i = 0; i < ship.length; i += 1) {
        boardInfo.board[startCoord + i * 10].ship = ship.id;
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        boardInfo.board[startCoord + i].ship = ship.id;
      }
    }
  };

  const allShipsSunk = () => {
    for (const cell of boardInfo.board) {
      if (cell.ship !== false && !cell.beenHit) {
        boardInfo.shipsLeft = true;
        return;
      }
    }
    boardInfo.shipsLeft = false;
  };

  const receiveHit = (coords) => {
    boardInfo.board[coords].beenHit = true;

    if (boardInfo.board[coords].ship) {
      boardInfo.lastShot.hit = true;
      boardInfo.lastShot.location = coords;
    }
    allShipsSunk();
  };

  return { boardInfo, placeShip, receiveHit, allShipsSunk, clearBoard };
};

module.exports = Gameboard;

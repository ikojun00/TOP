import Gameboard from './gameboard';
import Player from './player';
import Ship from './ship';

test('AI makes a legal move after a hit (at 0)', () => {
  const ai = Player('skynet');
  let i = 0;
  while (i < 7) {
    expect(ai.AI({ hit: true, location: 0 })).toBeGreaterThan(0);
    i += 1;
  }
});

test('AI makes a legal move after a hit (at 99)', () => {
  const ai = Player('skynet');
  let i = 0;
  while (i < 7) {
    expect(ai.AI({ hit: true, location: 99 })).toBeLessThan(99);
    i += 1;
  }
});

test('ai should PROBABLY hit again after a hit', () => {
  const board = Gameboard('player');
  const ship1 = Ship('titanic', 3);
  const ship2 = Ship('santa maria', 4, true);
  board.placeShip(ship1, 8);
  board.placeShip(ship2, 42);

  const ai = Player('smith');

  let i = 0;
  while (i < 4) {
    board.receiveHit(ai.AI({ hit: true, location: 8 }));
    i += 1;
  }
  let j = 0;
  while (j < 4) {
    board.receiveHit(ai.AI({ hit: true, location: 42 }));
    j += 1;
  }

  expect(
    board.boardInfo.board[7].beenHit && board.boardInfo.board[9].beenHit
  ).toBeTruthy();
  expect(
    board.boardInfo.board[32].beenHit && board.boardInfo.board[52].beenHit
  ).toBeTruthy();
});

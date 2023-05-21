import Gameboard from './gameboard';
import Ship from './ship';
import Player from './player';
import { createGridElements } from './DOM';
import { verticalOrHorizontal, placeAllShips } from './game';

const playerBoard = Gameboard('playerBoard');
const aiBoard = Gameboard('enemyBoard');
const player = Player('human');
const ai = Player('ai');

const carrierAI = Ship('Akagi', 5, verticalOrHorizontal());
const battleshipAI = Ship('Nagato', 4, verticalOrHorizontal());
const destroyerAI = Ship('Murakumo', 3, verticalOrHorizontal());
const submarineAI = Ship('I-68', 3, verticalOrHorizontal());
const patrolboatAI = Ship('Shimakaze', 2, verticalOrHorizontal());

placeAllShips(ai.playerInfo.name);
createGridElements(playerBoard.boardInfo.owner);

export {
  playerBoard,
  aiBoard,
  player,
  ai,
  carrierAI,
  battleshipAI,
  destroyerAI,
  submarineAI,
  patrolboatAI,
};

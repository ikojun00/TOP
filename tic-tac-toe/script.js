const Player = (name) => {
  const winner = () => {
    // uh oh
  };
  const getName = () => name;
  const move = (e, enemy) => {
    if (name === 'Player 1') {
      e.target.innerHTML = 'X';
    } else e.target.innerHTML = 'O';
    console.log(`${name} has made a move. ${enemy.getName()} is now.`);
  };
  return { move, getName };
};

function addEventListenerToButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.className === 'field' && e.target.innerHTML === '') {
        if (counter() % 2 !== 0) {
          player1.move(e, player2);
        } else player2.move(e, player1);
      }
    });
  });
}

const counterCreator = () => {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
};

const counter = counterCreator();

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const player1 = Player('Player 1');
const player2 = Player('Player 2');
addEventListenerToButtons(counter);

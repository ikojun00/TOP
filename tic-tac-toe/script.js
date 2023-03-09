const Player = (name) => {
  const getName = () => name;
  const move = (e, enemy) => {
    if (name === 'Player 1') {
      e.target.innerHTML = 'X';
    } else e.target.innerHTML = 'O';
    board[e.target.dataset.row][e.target.dataset.column] = e.target.innerHTML;
    for (let i = 0; i < 3; i += 1) {
      if (
        (board[i][0] === 'X' && board[i][1] === 'X' && board[i][2] === 'X') ||
        (board[0][i] === 'X' && board[1][i] === 'X' && board[2][i] === 'X') ||
        (board[0][2] === 'X' && board[1][1] === 'X' && board[2][0] === 'X') ||
        (board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') ||
        (board[i][0] === 'O' && board[i][1] === 'O' && board[i][2] === 'O') ||
        (board[0][i] === 'O' && board[1][i] === 'O' && board[2][i] === 'O') ||
        (board[0][2] === 'O' && board[1][1] === 'O' && board[2][0] === 'O') ||
        (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O')
      ) {
        setTimeout(() => {
          alert(`${name} has won!`);
          window.location.reload();
        }, 100);
      }
    }
    console.log(`${name} has made a move. ${enemy.getName()} is now.`);
  };
  return { move, getName };
};

function addEventListenerToButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.className === 'field' && e.target.innerHTML === '') {
        const count = counter();
        if (count % 2 !== 0) {
          player1.move(e, player2);
        } else player2.move(e, player1);
        if (count === 9) {
          console.log(`Tie!`);
        }
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
addEventListenerToButtons();

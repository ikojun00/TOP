const Player = (name) => {
  const getName = () => name;
  const winner = () => {
    setTimeout(() => {
      alert(`${name} has won!`);
      const spanGameWon = document.getElementById(`${name}`);
      let counterGameWon = parseInt(spanGameWon.innerText);
      counterGameWon += 1;
      spanGameWon.textContent = counterGameWon;
    }, 100);
  };
  const clearingBoard = () => {
    setTimeout(() => {
      for (let j = 0; j < 3; j += 1) {
        for (let k = 0; k < 3; k += 1) {
          board[j][k] = '';
        }
      }
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button) => {
        if (button.className === 'field') button.innerHTML = '';
      });
      counter.decrement();
    }, 100);
  };
  const move = (e, enemy, count) => {
    if (count % 2 !== 0) {
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
        winner();
        clearingBoard();
        const players = document.getElementsByName('players');
        console.log(players);
        const player1 = players[0].innerText;
        const player2 = players[1].innerText;
        const spanGameNumber = document.getElementById('game-number');
        let counterGameNumber = parseInt(spanGameNumber.innerText);
        counterGameNumber += 1;
        spanGameNumber.textContent = counterGameNumber;
        if (counterGameNumber % 2 === 0) {
          nextToPlay(player1.slice(0, -1), player2.slice(1));
        } else nextToPlay(player2.slice(1), player1.slice(0, -1));
        break;
      }
    }
    if (count === 9 && board[0][0] === '')
      setTimeout(() => {
        alert(`Tie!`);
        clearingBoard();
      }, 100);
    console.log(`${name} has made a move. ${enemy.getName()} is now.`);
  };
  return { move, getName, clearingBoard };
};

function validateForm() {
  const player1 = document.forms.myForm.player1.value;
  const player2 = document.forms.myForm.player2.value;
  if (player1 === '' || player2 === '') {
    return false;
  }
  return true;
}

function optionsButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.id === 'play-button') {
        if (validateForm() === true) {
          const players = {
            player1: '',
            player2: '',
          };
          const form = document.getElementById('myForm');
          const formData = new FormData(form);
          e.preventDefault();
          for (const [key, value] of formData) {
            if (key === 'player1') players.player1 = value;
            else if (key === 'player2') players.player2 = value;
            else console.log('Error');
          }
          const container =
            document.getElementsByClassName('container inactive');
          container[0].className = container[0].className.replace(
            'container inactive',
            'container'
          );
          const selection = document.getElementsByClassName('selection');
          selection[0].className = selection[0].className.replace(
            'selection',
            'selection inactive'
          );
          const spanPlayer1Name = document.getElementById(`player1-name`);
          spanPlayer1Name.id = `${players.player1}-name`;
          spanPlayer1Name.textContent = `${players.player1} `;
          spanPlayer1Name.style.color = 'red';

          const spanPlayer2Name = document.getElementById(`player2-name`);
          spanPlayer2Name.id = `${players.player2}-name`;
          spanPlayer2Name.textContent = ` ${players.player2}`;

          const spanPlayer1 = document.getElementById('player1-number');
          spanPlayer1.id = `${players.player1}`;

          const spanPlayer2 = document.getElementById('player2-number');
          spanPlayer2.id = `${players.player2}`;
          boardButtons(players);
        } else console.log('Error');
      }
    });
  });
}

function nextToPlay(player1, player2) {
  const spanPlayer1Name = document.getElementById(`${player1}-name`);
  spanPlayer1Name.style.color = '';
  const spanPlayer2Name = document.getElementById(`${player2}-name`);
  spanPlayer2Name.style.color = 'red';
}

function boardButtons(players) {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const player1 = Player(players.player1);
      const player2 = Player(players.player2);
      const spanGameNumber = document.getElementById('game-number');
      const counterGameNumber = parseInt(spanGameNumber.innerText);
      if (button.className === 'field' && e.target.innerHTML === '') {
        counter.increment();
        if ((counter.value() + counterGameNumber - 1) % 2 !== 0) {
          nextToPlay(player1.getName(), player2.getName());
          player1.move(e, player2, counter.value());
        } else {
          nextToPlay(player2.getName(), player1.getName());
          player2.move(e, player1, counter.value());
        }
      }
      if (button.id === 'restart') {
        if (counterGameNumber % 2 !== 0) {
          nextToPlay(player2.getName(), player1.getName());
          player2.clearingBoard();
        } else {
          nextToPlay(player1.getName(), player2.getName());
          player1.clearingBoard();
        }
      }
    });
  });
}

const counter = (function () {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment() {
      changeBy(1);
    },

    decrement() {
      changeBy(-privateCounter);
    },

    value() {
      return privateCounter;
    },
  };
})();

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

optionsButtons();

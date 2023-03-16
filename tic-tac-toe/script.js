const Player = (name) => {
  const getName = () => name;
  const winner = () => {
    if (name === 'easy' || name === 'unbeatable') alert(`AI has won!`);
    else alert(`${name} has won!`);

    const spanGameWon = document.getElementById(`${name}`);
    let counterGameWon = parseInt(spanGameWon.innerText);
    counterGameWon += 1;
    spanGameWon.textContent = counterGameWon;
  };
  const clearingBoard = (enemy) => {
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
    const players = document.getElementsByName('players');
    const player1 = players[0].innerText;
    let player2 = players[1].innerText;
    if (player2 === ' AI' && (name === 'easy' || name === 'unbeatable'))
      player2 = ` ${name}`;
    else if (
      player2 === ' AI' &&
      (enemy.getName() === 'easy' || enemy.getName() === 'unbeatable')
    )
      player2 = ` ${enemy.getName()}`;

    const spanGameNumber = document.getElementById('game-number');
    let counterGameNumber = parseInt(spanGameNumber.innerText);
    counterGameNumber += 1;
    spanGameNumber.textContent = counterGameNumber;
    if (counterGameNumber % 2 === 0) {
      if (name === 'easy' || name === 'unbeatable') ai();
      nextToPlay(player1.slice(0, -1), player2.slice(1));
    } else nextToPlay(player2.slice(1), player1.slice(0, -1));
  };
  const ai = () => {
    setTimeout(() => {
      if (name === 'easy') {
        easyAI();
      } else if (name === 'unbeatable') {
        unbeatableAI();
      } else console.log('Error');
    }, 800);
  };
  const move = async (e, enemy, count) => {
    if (count % 2 !== 0) {
      e.target.textContent = 'X';
    } else e.target.textContent = 'O';
    board[e.target.dataset.row][e.target.dataset.column] = e.target.textContent;
    console.table(board);
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
        clearingBoard(enemy);
        break;
      } else if (count === 9 && i === 2) {
        alert(`Tie!`);
        clearingBoard(enemy);
        break;
      }
    }
  };
  return { move, getName, ai };
};

function easyAI() {
  let i = Math.floor(Math.random() * 3);
  let j = Math.floor(Math.random() * 3);
  while (board[i][j] !== '') {
    i = Math.floor(Math.random() * 3);
    j = Math.floor(Math.random() * 3);
  }
  document.querySelector(`[data-row="${i}"][data-column="${j}"]`).click();
}

function isMovesLeft() {
  for (let i = 0; i < 3; i += 1)
    for (let j = 0; j < 3; j += 1) if (board[i][j] === '') return true;

  return false;
}

function evaluate(computer, player) {
  for (let row = 0; row < 3; row += 1) {
    if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      if (board[row][0] === computer) return +10;

      if (board[row][0] === player) return -10;
    }
  }

  // Checking for Columns for X or O victory.
  for (let col = 0; col < 3; col += 1) {
    if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      if (board[0][col] === computer) return +10;

      if (board[0][col] === player) return -10;
    }
  }

  // Checking for Diagonals for X or O victory.
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    if (board[0][0] === computer) return +10;

    if (board[0][0] === player) return -10;
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    if (board[0][2] === computer) return +10;

    if (board[0][2] === player) return -10;
  }

  // Else if none of them have
  // won then return 0
  return 0;
}

function minimax(depth, isMax, computer, player) {
  const score = evaluate(computer, player);

  if (score === 10) return score;

  if (score === -10) return score;

  if (isMovesLeft(board) === false) return 0;

  if (isMax) {
    let best = -1000;

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (board[i][j] === '') {
          board[i][j] = computer;

          best = Math.max(best, minimax(depth + 1, !isMax, computer, player));

          board[i][j] = '';
        }
      }
    }
    return best;
  }

  let best = 1000;

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[i][j] === '') {
        board[i][j] = player;

        best = Math.min(best, minimax(depth + 1, !isMax, computer, player));

        board[i][j] = '';
      }
    }
  }
  return best;
}

function unbeatableAI() {
  let bestVal = -Infinity;
  let computer = 'X';
  let player = 'O';
  function Move(row, col) {
    this.row = row;
    this.col = col;
  }
  const bestMove = new Move(-1, -1);
  const spanGameNumber = document.getElementById('game-number');
  const counterGameNumber = parseInt(spanGameNumber.innerText);

  if (counterGameNumber % 2 !== 0) {
    computer = 'O';
    player = 'X';
  }

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[i][j] === '') {
        board[i][j] = computer;
        const moveVal = minimax(0, false, computer, player);
        board[i][j] = '';

        if (moveVal > bestVal) {
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal;
        }
      }
    }
  }

  document
    .querySelector(
      `[data-row="${bestMove.row}"][data-column="${bestMove.col}"]`
    )
    .click();
}

function validateForm() {
  const player1 = document.forms.myForm.player1.value;
  const player2 = document.forms.myForm.player2.value;
  if (player1 === '' || player2 === '') {
    return false;
  }
  const textSwitch = document.getElementById('switch');
  if (
    textSwitch.innerHTML === 'Switch to Player VS. AI' &&
    (player2 === 'easy' || player2 === 'unbeatable' || player2 === 'AI')
  ) {
    alert('Player2 must change name!');
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
          spanPlayer1Name.style.color = '#0E8388';

          const spanPlayer2Name = document.getElementById(`player2-name`);
          spanPlayer2Name.id = `${players.player2}-name`;
          spanPlayer2Name.textContent = ` ${players.player2}`;
          if (players.player2 === 'easy' || players.player2 === 'unbeatable')
            spanPlayer2Name.textContent = ' AI';

          const spanPlayer1 = document.getElementById('player1-number');
          spanPlayer1.id = `${players.player1}`;

          const spanPlayer2 = document.getElementById('player2-number');
          spanPlayer2.id = `${players.player2}`;
          boardButtons(players);
        } else console.log('Error');
      }
      if (button.id === 'switch') {
        const textSwitch = document.getElementById(button.id);
        const parent = document.getElementById('player2');
        if (textSwitch.innerHTML === 'Switch to Player VS. AI') {
          while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
          }
          parent.innerHTML =
            '<label for="player2"><b>AI</b></label><br>' +
            '<select name="player2"><option value="easy">Easy</option><option value="unbeatable">Unbeatable</option></select><br><br>';
          textSwitch.innerHTML = 'Switch to Player VS. Player';
        } else if (textSwitch.innerHTML === 'Switch to Player VS. Player') {
          while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
          }
          parent.innerHTML =
            '<label for="player2"><b>Player 2</b></label><br>' +
            '<input type="text" placeholder="Enter name" name="player2" maxlength="50" required><br><br>';
          textSwitch.innerHTML = 'Switch to Player VS. AI';
        }
      }
    });
  });
}

function restart() {
  const buttons = document.querySelectorAll('button');
  for (let j = 0; j < 3; j += 1) {
    for (let k = 0; k < 3; k += 1) {
      board[j][k] = '';
    }
  }
  buttons.forEach((btn) => {
    if (btn.className === 'field') btn.innerHTML = '';
  });
  counter.decrement();
}

function nextToPlay(player1, player2) {
  const spanPlayer1Name = document.getElementById(`${player1}-name`);
  spanPlayer1Name.style.color = '';
  const spanPlayer2Name = document.getElementById(`${player2}-name`);
  spanPlayer2Name.style.color = '#0E8388';
}

function boardButtons(players) {
  const buttons = document.querySelectorAll('button');
  const player1 = Player(players.player1);
  const player2 = Player(players.player2);

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const spanGameNumber = document.getElementById('game-number');
      const counterGameNumber = parseInt(spanGameNumber.innerText);
      if (button.className === 'field' && e.target.innerHTML === '') {
        counter.increment();
        if ((counter.value() + counterGameNumber - 1) % 2 !== 0) {
          nextToPlay(player1.getName(), player2.getName());
          player1.move(e, player2, counter.value());
          const spanPlayer2Name = document.getElementById(
            `${player2.getName()}-name`
          );
          if (
            (player2.getName() === 'easy' ||
              player2.getName() === 'unbeatable') &&
            (counter.value() !== 0 ||
              spanPlayer2Name.style.color === 'rgb(14, 131, 136)')
          ) {
            player2.ai();
          }
          if (
            (player2.getName() === 'easy' ||
              player2.getName() === 'unbeatable') &&
            counterGameNumber % 2 === 0 &&
            counter.value() === 0 &&
            spanPlayer2Name.style.color === 'rgb(14, 131, 136)'
          ) {
            player2.ai();
          }
        } else {
          nextToPlay(player2.getName(), player1.getName());
          player2.move(e, player1, counter.value());
        }
      }
      if (button.id === 'restart') {
        if (counterGameNumber % 2 !== 0) {
          nextToPlay(player2.getName(), player1.getName());
          restart();
        } else {
          nextToPlay(player1.getName(), player2.getName());
          if (
            player2.getName() === 'easy' ||
            player2.getName() === 'unbeatable'
          ) {
            player2.ai();
          }
          restart();
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
    minusOne() {
      changeBy(-1);
    },
  };
})();

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

optionsButtons();

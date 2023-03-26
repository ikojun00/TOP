import { createCard } from './todos';

function addEventListenerOnButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.id === 'add-button') createCard();
    });
  });
}

addEventListenerOnButtons();

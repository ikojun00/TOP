import { removeAllChildNodes, openForm, closeForm, Card } from './todos';

function addEventListenerOnButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.id === 'add-button') openForm('myForm');
      else if (button.id === 'submit-button') {
        const content = document.querySelector('#content');
        removeAllChildNodes(content);
        const form = document.getElementById('myForm');
        const formData = new FormData(form);
        e.preventDefault();
        new Card().addCardToContent(formData);
        closeForm('myForm');
      } else console.log('Error');
    });
  });
}

addEventListenerOnButtons();

import { createCard, openForm, removeAllChildNodes, closeForm } from './todos';

function addEventListenerOnButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.id === 'add-button') openForm();
      else if (button.id === 'submit-button') {
        const content = document.querySelector('#content');
        removeAllChildNodes(content);
        const form = document.getElementById('myForm');
        const formData = new FormData(form);
        e.preventDefault();
        new Card().addCardToContent(formData);
        closeForm();
      }
    });
  });
}

class Card {
  constructor(title, desc, priority) {
    this.title = title;
    this.desc = desc;
    this.priority = priority;
  }

  addCardToContent(formData) {
    const card = {
      title: '',
      desc: '',
      priority: '',
    };

    for (const [key, value] of formData) {
      if (key === 'title') card.title = value;
      else if (key === 'desc') card.desc = value;
      else if (key === 'priority') card.priority = value;
      else console.log('Error');
    }

    const theHobbit = new Card(card.title, card.desc, card.priority);
    cards.push(theHobbit);
    for (let i = 0; i < cards.length; i += 1) createCard(cards[i]);
    console.table(cards);
  }
}

const cards = [];
addEventListenerOnButtons();

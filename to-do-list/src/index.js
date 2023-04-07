import { cards, createCard, isCheckedCard } from './todos';

function getFromLocalStorage() {
  let counter = 0;
  const reference = localStorage.getItem('cards');
  if (reference) {
    const storage = JSON.parse(reference);
    storage.forEach((card) => {
      cards.push(card);
      createCard(card, counter);
      isCheckedCard(counter);
      counter += 1;
    });
  }
}

getFromLocalStorage();

import {
  createCardDOM,
  detailsCard,
  openForm,
  closeForm,
  openContent,
  higlightOpenContent,
} from './DOM';
import { validateForm } from './form';

function removeCard(i) {
  cards.splice(i, 1);
  localStorage.setItem('cards', JSON.stringify(cards));
  const content = document.querySelectorAll('.card');
  content.forEach((card) => {
    card.remove();
  });
  cards.forEach((element, j) => createCard(element, j));
}

function isCheckedCard(i) {
  const checkboxBtn = document.querySelectorAll(
    `[data-checkbox-button='${i}']`
  );
  if (cards[i].done === false) {
    checkboxBtn.forEach((element) => {
      element.style.backgroundColor = 'white';
      element.nextElementSibling.style.textDecoration = 'none';
    });
  } else {
    checkboxBtn.forEach((element) => {
      element.style.backgroundColor = 'rgb(212, 163, 115)';
      element.nextElementSibling.style.textDecoration = 'line-through';
    });
  }
}

function isToday(date) {
  const otherDate = new Date(date);
  const todayDate = new Date();

  if (
    otherDate.getDate() === todayDate.getDate() &&
    otherDate.getMonth() === todayDate.getMonth() &&
    otherDate.getYear() === todayDate.getYear()
  ) {
    return true;
  }
  return false;
}

function isThisWeek(date) {
  const otherDate = new Date(date);
  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();

  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay - 1));

  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 7);

  return otherDate >= firstDayOfWeek && otherDate <= lastDayOfWeek;
}

function addEventListenerOnCardButtons(i) {
  const checkboxBtn = document.querySelectorAll(
    `[data-checkbox-button='${i}']`
  );
  checkboxBtn.forEach((element) =>
    element.addEventListener('click', () => {
      if (cards[i].done === true) cards[i].done = false;
      else cards[i].done = true;
      isCheckedCard(i);
      localStorage.setItem('cards', JSON.stringify(cards));
    })
  );
  const removeBtn = document.querySelectorAll(`[data-remove-button='${i}']`);
  removeBtn.forEach((element) =>
    element.addEventListener('click', () => removeCard(i))
  );
  const detailsBtn = document.querySelectorAll(`[data-details-button='${i}']`);
  detailsBtn.forEach((element) =>
    element.addEventListener('click', () => detailsCard(i))
  );
}

const Card = (formData) => {
  const card = {
    title: '',
    desc: '',
    priority: '',
    date: '',
    done: false,
  };

  for (const [key, value] of formData) {
    if (key === 'title') card.title = value;
    else if (key === 'desc') card.desc = value;
    else if (key === 'priority') card.priority = value;
    else if (key === 'date') card.date = value;
    else console.log('Error');
  }
  cards.push(card);
  localStorage.setItem('cards', JSON.stringify(cards));
  createCard(card, cards.length - 1);
  return { card };
};

function createCard(card, i) {
  if (isToday(card.date)) createCardDOM(card, i, 'content-today');
  if (isThisWeek(card.date)) createCardDOM(card, i, 'content-week');
  createCardDOM(card, i, 'content-inbox');
  addEventListenerOnCardButtons(i);
}

export const cards = [];

function addEventListenerOnButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.id === 'add-button') openForm('myForm');
      else if (button.id === 'submit-button') {
        if (validateForm() === true) {
          const form = document.getElementById('myForm');
          const formData = new FormData(form);
          e.preventDefault();
          Card(formData);
          closeForm('myForm');
        }
      } else if (button.id === 'inbox-button') {
        openContent('content-inbox');
        higlightOpenContent('inbox');
      } else if (button.id === 'today-button') {
        openContent('content-today');
        higlightOpenContent('today');
      } else if (button.id === 'week-button') {
        openContent('content-week');
        higlightOpenContent('week');
      }
    });
  });
}

addEventListenerOnButtons();

export { Card, createCard, isCheckedCard };

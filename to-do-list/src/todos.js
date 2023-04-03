function openContent(id) {
  document.getElementById(id).style.display = 'grid';
  document
    .querySelectorAll(`.content >*:not(#${id})`)
    .forEach((e) => (e.style.display = 'none'));
}

function higlightOpenContent(id) {
  const myDiv = document.getElementById('sidebar');
  document.getElementById(id).style.backgroundColor = '#D4A373';
  document.getElementById(`${id}-button`).style.backgroundColor = '#D4A373';
  myDiv
    .querySelectorAll(`ul>*:not(#${id})`)
    .forEach((e) => (e.style.backgroundColor = '#FAEDCD'));
  myDiv
    .querySelectorAll(`li>*:not(#${id}-button)`)
    .forEach((e) => (e.style.backgroundColor = '#FAEDCD'));
}

function openForm(id) {
  document.getElementById(id).style.display = 'flex';
  document.getElementById('add-button').style.display = 'none';
  document
    .querySelectorAll(`body >*:not(#${id})`)
    .forEach((e) => (e.style.filter = 'blur(10px)'));
}

function closeForm(id) {
  document.getElementById(id).style.display = 'none';
  document.getElementById('add-button').style.display = 'flex';
  document
    .querySelectorAll('body >*')
    .forEach((e) => (e.style.filter = 'blur(0)'));
}

// fix
function removeCard(i) {
  const storage = JSON.parse(localStorage.getItem('cards'));
  console.log(cards);
  storage.slice(i, 1);
  localStorage.setItem('cards', JSON.stringify(storage));
  cards.splice(i, 1);
  const card = document.querySelectorAll(`[data-remove-button='${i}']`);
  card.forEach((element) =>
    element.parentNode.parentNode.parentNode.removeChild(
      element.parentNode.parentNode
    )
  );
}

function detailsCard(i) {
  const details = document.getElementById('card-details-text');
  details.innerHTML = `
                <p>Title: ${cards[i].title}</p>
                <p>Description: ${cards[i].desc}</p>
                <p>Date: ${cards[i].date}</p>
                <p>Priority: ${cards[i].priority}</p>
                <button id='details-close-button'>Close</button>`;
  openForm('card-details-text');
  const closeDetailsBtn = document.getElementById('details-close-button');
  closeDetailsBtn.addEventListener('click', () =>
    closeForm('card-details-text')
  );
}

function isCheckedCard(i) {
  const checkboxBtn = document.querySelectorAll(
    `[data-checkbox-button='${i}']`
  );
  checkboxBtn.forEach((element) => {
    if (element.style.backgroundColor !== 'rgb(212, 163, 115)') {
      element.style.backgroundColor = 'rgb(212, 163, 115)';
      element.nextElementSibling.style.textDecoration = 'line-through';
    } else {
      element.style.backgroundColor = 'white';
      element.nextElementSibling.style.textDecoration = 'none';
    }
  });
}

function createCard(card, i, id) {
  const content = document.getElementById(id);
  const child = document.createElement('div');
  child.classList.add('card');
  child.innerHTML = `
            <div class="card-text">
              <button id='checkbox-button' data-checkbox-button=${i}></button>
              <p>${card.title}</p>
            </div>
            <div class="card-options">
                <button id='details-button' data-details-button=${i}>Details</button>
                <p>${card.date}</p>
                <button id='remove-button' data-remove-button=${i}><img src="SVG/trash-can-outline.svg" alt="Trash"></button>
            </div>`;
  content.appendChild(child);
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
    element.addEventListener('click', () => isCheckedCard(i))
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

class Card {
  constructor(title, desc, priority, date) {
    this.title = title;
    this.desc = desc;
    this.priority = priority;
    this.date = date;
  }

  addCardToContent(formData) {
    const card = {
      title: '',
      desc: '',
      priority: '',
      date: '',
    };

    for (const [key, value] of formData) {
      if (key === 'title') card.title = value;
      else if (key === 'desc') card.desc = value;
      else if (key === 'priority') card.priority = value;
      else if (key === 'date') card.date = value;
      else console.log('Error');
    }

    const theHobbit = new Card(card.title, card.desc, card.priority, card.date);
    cards.push(theHobbit);
    addToLocalStorage(theHobbit);
    console.table(cards);
  }
}

let cards = [];

function addToLocalStorage(card) {
  localStorage.setItem('cards', JSON.stringify(cards));
  if (isToday(card.date)) createCard(card, cards.length - 1, 'content-today');
  if (isThisWeek(card.date)) createCard(card, cards.length - 1, 'content-week');
  createCard(card, cards.length - 1, 'content-inbox');
  addEventListenerOnCardButtons(cards.length - 1);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('cards');
  console.log(reference);
  if (reference) {
    cards = JSON.parse(reference);
    cards.forEach((card) => {
      addToLocalStorage(card);
    });
  }
}

getFromLocalStorage();

export { openForm, closeForm, Card, openContent, higlightOpenContent };

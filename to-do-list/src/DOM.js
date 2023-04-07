import { cards } from './todos';

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

function createCardDOM(card, i, id) {
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

export {
  detailsCard,
  createCardDOM,
  openForm,
  closeForm,
  openContent,
  higlightOpenContent,
};

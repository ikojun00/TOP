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

function removeCard(i) {
  cards.splice(i, 1);
  const card = document.querySelector(`[data-remove-button='${i}']`);
  card.parentNode.parentNode.parentNode.removeChild(card.parentNode.parentNode);
}

function detailsCard(i) {
  const details = document.getElementById('card-details-text');
  details.innerHTML = `
                <p>Title: ${cards[i].title}</p>
                <p>Description: ${cards[i].desc}</p>
                <p>Priority: ${cards[i].priority}</p>
                <button id='details-close-button'>Close</button>`;
  openForm('card-details-text');
  const closeDetailsBtn = document.getElementById('details-close-button');
  closeDetailsBtn.addEventListener('click', () =>
    closeForm('card-details-text')
  );
  console.log(cards[i]);
}

function createCard(card, i) {
  const content = document.getElementById('content');
  const child = document.createElement('div');
  child.classList.add('card');
  child.innerHTML += `
            <div class="card-text">
                <input type="checkbox" name="my-checkbox" id="opt-in"/>
                <p>${card.title}</p>
            </div>
            <div class="card-options">
                <button id='details-button' data-details-button=${i}>Details</button>
                <img src="SVG/file-edit-outline.svg" alt="File Edit">
                <button id='remove-button' data-remove-button=${i}><img src="SVG/trash-can-outline.svg" alt="Trash"></button>
            </div>`;
  content.appendChild(child);
  const removeBtn = document.querySelector(`[data-remove-button='${i}']`);
  removeBtn.addEventListener('click', () => removeCard(i));
  const detailsBtn = document.querySelector(`[data-details-button='${i}']`);
  detailsBtn.addEventListener('click', () => detailsCard(i));
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
    createCard(cards[cards.length - 1], cards.length - 1);
    console.table(cards);
  }
}

const cards = [];

export { openForm, closeForm, Card };

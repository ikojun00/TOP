function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function openForm(id) {
  document.getElementById(id).style.display = 'flex';
  document.getElementById('add-button').style.display = 'none';
  document
    .querySelectorAll('body >*:not(#myForm)')
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
  const card = document.querySelector(`[data-remove='${i}']`);
  card.parentNode.parentNode.parentNode.removeChild(card.parentNode.parentNode);
}

function detailsCard(i) {
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
                <button id='details-button' data-details=${i}>Details</button>
                <img src="SVG/file-edit-outline.svg" alt="File Edit">
                <button id='remove-button' data-remove=${i}><img src="SVG/trash-can-outline.svg" alt="Trash"></button>
            </div>`;
  content.appendChild(child);
  const removeBtn = document.querySelector(`[data-remove='${i}']`);
  removeBtn.addEventListener('click', () => removeCard(i));
  const detailsBtn = document.querySelector(`[data-details='${i}']`);
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
    for (let i = 0; i < cards.length; i += 1) createCard(cards[i], i);
    console.table(cards);
  }
}

const cards = [];

export { openForm, removeAllChildNodes, closeForm, Card };

function openContent(id) {
  document.getElementById(id).style.display = 'grid';
  document
    .querySelectorAll(`.content >*:not(#${id})`)
    .forEach((e) => (e.style.display = 'none'));
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

function removeCard(i) {
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
  console.log(cards[i]);
}

function isCheckboxChecked() {
  if (this.checked) {
    console.log('Checkbox is checked..');
  } else {
    console.log('Checkbox is not checked..');
  }
}

function createCard(card, i, id) {
  const content = document.getElementById(id);
  const child = document.createElement('div');
  child.classList.add('card');
  child.innerHTML = `
            <div class="card-text">
                <input type="checkbox" name="checkbox" id="opt-in" data-checkbox=${i}/>
                <p>${card.title}</p>
            </div>
            <div class="card-options">
                <button id='details-button' data-details-button=${i}>Details</button>
                <p>${card.date}</p>
                <button id='edit-button' data-edit-button=${i}><img src="SVG/file-edit-outline.svg" alt="File Edit"></button>
                <button id='remove-button' data-remove-button=${i}><img src="SVG/trash-can-outline.svg" alt="Trash"></button>
            </div>`;
  content.appendChild(child);

  const checkbox = document.querySelector('input[name=checkbox]');
  checkbox.addEventListener('change', () => isCheckboxChecked());
  const removeBtn = document.querySelector(`[data-remove-button='${i}']`);
  removeBtn.addEventListener('click', () => removeCard(i));
  const editBtn = document.querySelector(`[data-edit-button='${i}']`);
  editBtn.addEventListener('click', () => editCard(i));
  const detailsBtn = document.querySelector(`[data-details-button='${i}']`);
  detailsBtn.addEventListener('click', () => detailsCard(i));
}

function editCard(i) {
  removeCard(i);
  openForm('myForm');
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

  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  return otherDate >= firstDayOfWeek && otherDate <= lastDayOfWeek;
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
    if (isToday(card.date))
      createCard(theHobbit, cards.length - 1, 'content-today');
    if (isThisWeek(card.date))
      createCard(theHobbit, cards.length - 1, 'content-week');
    createCard(theHobbit, cards.length - 1, 'content-inbox');
    console.table(cards);
  }
}

const cards = [];

export { openForm, closeForm, Card, openContent };

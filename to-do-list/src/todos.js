function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function openForm() {
  document.getElementById('myForm').style.display = 'flex';
  document.getElementById('add-button').style.display = 'none';
  document
    .querySelectorAll('body >*:not(#myForm)')
    .forEach((e) => (e.style.filter = 'blur(10px)'));
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('add-button').style.display = 'flex';
  document
    .querySelectorAll('body >*')
    .forEach((e) => (e.style.filter = 'blur(0)'));
}

function createCard(card) {
  const content = document.getElementById('content');
  const child = document.createElement('div');
  child.classList.add('card');
  child.innerHTML += `
            <div class="card-text">
                <input type="checkbox" name="my-checkbox" id="opt-in"/>
                <p>${card.title}</p>
            </div>
            <div class="card-options">
                <button>Details</button>
                <img src="SVG/file-edit-outline.svg" alt="File Edit">
                <img src="SVG/trash-can-outline.svg" alt="Trash">
            </div>`;
  content.appendChild(child);
}

export { createCard, openForm, removeAllChildNodes, closeForm };

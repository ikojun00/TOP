function createCard() {
  const content = document.getElementById('content');
  const child = document.createElement('div');
  child.classList.add('card');
  child.innerHTML += `
            <div class="card-text">
                <input type="checkbox" name="my-checkbox" id="opt-in"/>
                <p>Title</p>
            </div>
            <div class="card-options">
                <button>Details</button>
                <img src="SVG/file-edit-outline.svg" alt="File Edit">
                <img src="SVG/trash-can-outline.svg" alt="Trash">
            </div>`;
  content.appendChild(child);
}

export { createCard };

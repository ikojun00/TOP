function myLibrary(latestBook) {
  const content = document.querySelector('.content');
  const book = document.createElement('div');
  book.classList.add('card');
  const removeButton = document.createElement('div');
  removeButton.classList.add('remove-button');
  const btnRemoveButton = document.createElement('button');
  const textRemoveButton = document.createTextNode('X');
  btnRemoveButton.appendChild(textRemoveButton);
  removeButton.appendChild(btnRemoveButton);
  book.appendChild(removeButton);
  btnRemoveButton.addEventListener('click', (e) => {
    e.target.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode
    );
  });
  const title = document.createElement('p');
  const textTitle = document.createTextNode(`Title: ${latestBook.title}`);
  title.appendChild(textTitle);
  book.appendChild(title);
  const author = document.createElement('p');
  const textAuthor = document.createTextNode(`Author: ${latestBook.author}`);
  author.appendChild(textAuthor);
  book.appendChild(author);
  const pages = document.createElement('p');
  const textPages = document.createTextNode(`Pages: ${latestBook.pages}`);
  pages.appendChild(textPages);
  book.appendChild(pages);
  const isRead = document.createElement('div');
  isRead.classList.add('is-read-button');
  const btnIsRead = document.createElement('button');
  const textIsRead = document.createTextNode(`${latestBook.isRead}`);
  if (`${latestBook.isRead}` === 'Not Read') {
    btnIsRead.style.backgroundColor = '#FFCCCB';
  } else if (`${latestBook.isRead}` === 'Read') {
    btnIsRead.style.backgroundColor = 'lightgreen';
  } else console.log('Error');
  btnIsRead.appendChild(textIsRead);
  isRead.appendChild(btnIsRead);
  book.appendChild(isRead);
  btnIsRead.addEventListener('click', (e) => {
    if (e.target.innerHTML === 'Not Read') {
      e.target.innerHTML = 'Read';
      e.target.style.background = 'lightgreen';
    } else if (e.target.innerHTML === 'Read') {
      e.target.innerHTML = 'Not Read';
      e.target.style.background = '#FFCCCB ';
    } else console.log(e.target.innerHTML);
  });
  content.append(book);
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(formData) {
  const book = {
    title: '',
    author: '',
    pages: '',
    isRead: 'Not Read',
  };

  for (const [key, value] of formData) {
    if (key === 'title') book.title = value;
    else if (key === 'author') book.author = value;
    else if (key === 'pages') book.pages = value;
    else if (key === 'checkbox' && value === 'on') book.isRead = 'Read';
    else console.log('Error');
  }

  const theHobbit = new Book(book.title, book.author, book.pages, book.isRead);
  books.push(theHobbit);
  const latestBook = books[books.length - 1];
  myLibrary(latestBook);
}

function openForm() {
  document.getElementById('myForm').style.display = 'block';
  document.getElementById('open-button').style.display = 'none';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('open-button').style.display = 'block';
}

function addEventListenerToButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.id === 'add-button') {
        const form = document.getElementById('myForm');
        const formData = new FormData(form);
        e.preventDefault();
        addBookToLibrary(formData);
        closeForm();
      } else if (button.id === 'open-button') openForm();
      else if (button.id === 'close-button') closeForm();
      else return -1;
    });
  });
}

const books = [];
addEventListenerToButtons();

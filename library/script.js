function myLibrary(latestBook) {
  const content = document.querySelector('.content');
  const book = document.createElement('div');
  book.classList.add('card');
  const removeButton = document.createElement('div');
  removeButton.classList.add('removeButton');
  const btnRemoveButton = document.createElement('button');
  const textRemoveButton = document.createTextNode(`remove`);
  btnRemoveButton.appendChild(textRemoveButton);
  removeButton.appendChild(btnRemoveButton);
  book.appendChild(removeButton);
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
  const isRead = document.createElement('p');
  const textIsRead = document.createTextNode(
    `Did you read it?: ${latestBook.isRead}`
  );
  isRead.appendChild(textIsRead);
  book.appendChild(isRead);
  content.append(book);
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  const form = document.getElementById('myForm');
  const formData = new FormData(form);
  const book = {
    title: '',
    author: '',
    pages: '',
    isRead: 'No',
  };

  for (const [key, value] of formData) {
    if (key === 'title') book.title = value;
    else if (key === 'author') book.author = value;
    else if (key === 'pages') book.pages = value;
    else if (key === 'checkbox' && value === 'on') book.isRead = 'Yes';
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
        addBookToLibrary();
        e.preventDefault();
        closeForm();
      } else if (button.id === 'open-button') openForm();
      else if (button.id === 'close-button') closeForm();
      else return -1;
    });
  });
}

const books = [];
addEventListenerToButtons();

function myLibrary(latestBook) {
  const content = document.querySelector('.content');
  const book = document.createElement('div');
  book.classList.add('card');
  const title = document.createElement('p');
  const textTitle = document.createTextNode(`Title: ${latestBook.title}`);
  title.appendChild(textTitle);
  book.appendChild(title);
  const author = document.createElement('p');
  const textAuthor = document.createTextNode(`Author:${latestBook.author}`);
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
  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'No');
  books.push(theHobbit);
  const latestBook = books[books.length - 1];
  myLibrary(latestBook);
}

function addEventListenerToButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.id === 'add-button') addBookToLibrary();
      else return -1;
    });
  });
}

const books = [];
addEventListenerToButtons();

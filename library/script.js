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
    const removedTitle = e.target.parentNode.nextElementSibling.textContent;
    for (let i = 0; i < books.length; i++) {
      if (removedTitle === `Title: ${books[i].title}Author: ${books[i].author}Pages: ${books[i].pages}`) {
        books.splice(i, 1);
      }
    }
    e.target.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode
    );
  });
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');
  const title = document.createElement('p');
  const textTitle = document.createTextNode(`Title: ${latestBook.title}`);
  title.appendChild(textTitle);
  cardContent.appendChild(title);
  const author = document.createElement('p');
  const textAuthor = document.createTextNode(`Author: ${latestBook.author}`);
  author.appendChild(textAuthor);
  cardContent.appendChild(author);
  const pages = document.createElement('p');
  const textPages = document.createTextNode(`Pages: ${latestBook.pages}`);
  pages.appendChild(textPages);
  cardContent.appendChild(pages);
  book.appendChild(cardContent);

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
      const book = e.target.parentNode.previousElementSibling.textContent;
      for (let i = 0; i < books.length; i++) {
        if (book === `Title: ${books[i].title}Author: ${books[i].author}Pages: ${books[i].pages}`) {
          books[i].isRead = 'Read';
        }
      }
      e.target.innerHTML = 'Read';
      e.target.style.background = 'lightgreen';
    } else if (e.target.innerHTML === 'Read') {
      const book = e.target.parentNode.previousElementSibling.textContent;
      for (let i = 0; i < books.length; i++) {
        if (book === `Title: ${books[i].title}Author: ${books[i].author}Pages: ${books[i].pages}`) {
          books[i].isRead = 'Not Read';
        }
      }
      e.target.innerHTML = 'Not Read';
      e.target.style.background = '#FFCCCB ';
    } else console.log(e.target.innerHTML);
    console.table(books);
  });
  content.append(book);
}

class Book
{
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  addBookToLibrary(formData) {
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
    for (let i = 0; i < books.length; i++) myLibrary(books[i]);
    console.table(books);
  }
}

function validateForm() {
  const titleId = document.getElementById("title");
  const title = document.forms.myForm.title.value;
  const author = document.forms.myForm.author.value;
  const pages = document.forms.myForm.pages.value;
  for (let i = 0; i < books.length; i++) {
    if (title === books[i].title && author === books[i].author) {
      titleId.setCustomValidity("You already have this book in the library.");
      return;
    }
  }
  titleId.setCustomValidity("");
  if (title === '' || author === '' || pages === '') {
    return false;
  }
  console.table(books);
  return true;
}

function openForm() {
  document.getElementById('myForm').style.display = 'block';
  document.getElementById('open-button').style.display = 'none';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('open-button').style.display = 'block';
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function addEventListenerToButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.id === 'add-button') {
        if (validateForm() === true) {
          const content = document.querySelector('.content');
          removeAllChildNodes(content);
          const form = document.getElementById('myForm');
          const formData = new FormData(form);
          new Book().addBookToLibrary(formData);
          closeForm();
        }
      } else if (button.id === 'open-button') openForm();
      else if (button.id === 'close-button') closeForm();
      else return -1;
      e.preventDefault(); // Prevent form submission from refreshing the page
    });
  });
}

const books = [];
addEventListenerToButtons();

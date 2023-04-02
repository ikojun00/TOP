import {
  openForm,
  closeForm,
  Card,
  openContent,
  higlightOpenContent,
} from './todos';

function validateForm() {
  const title = document.forms.myForm.title.value;
  const date = document.forms.myForm.date.value;
  if (title === '' || date === '') {
    return false;
  }
  return true;
}

function addEventListenerOnButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.id === 'add-button') openForm('myForm');
      else if (button.id === 'submit-button') {
        if (validateForm() === true) {
          const form = document.getElementById('myForm');
          const formData = new FormData(form);
          e.preventDefault();
          new Card().addCardToContent(formData);
          closeForm('myForm');
        }
      } else if (button.id === 'inbox-button') {
        openContent('content-inbox');
        higlightOpenContent('inbox');
      } else if (button.id === 'today-button') {
        openContent('content-today');
        higlightOpenContent('today');
      } else if (button.id === 'week-button') {
        openContent('content-week');
        higlightOpenContent('week');
      } else console.log('Error');
    });
  });
}

addEventListenerOnButtons();

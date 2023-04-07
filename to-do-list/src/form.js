function validateForm() {
  const title = document.forms.myForm.title.value;
  const date = document.forms.myForm.date.value;
  if (title === '' || date === '') {
    return false;
  }
  return true;
}

export { validateForm };

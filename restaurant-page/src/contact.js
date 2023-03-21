function createContact() {
    const contact = document.createElement('div')
    contact.classList.add('contact')
  
    const phoneNumber = document.createElement('p')
    phoneNumber.textContent = '📞 123 456 789'
  
    //https://goo.gl/maps/vNrhPtEoxf7aHWvM7 
    const restaurantLocation = document.createElement('img')
    restaurantLocation.src = 'images/location.png'
    restaurantLocation.alt = 'Restaurant location'

    const textRestaurantLocation = document.createElement('p');
    textRestaurantLocation.innerHTML = '<a href="https://goo.gl/maps/vNrhPtEoxf7aHWvM7">Far Far away</a>';

    contact.appendChild(phoneNumber)
    contact.appendChild(restaurantLocation)
    contact.appendChild(textRestaurantLocation)
  
    return contact
  }
  
  function loadContact() {
    const main = document.getElementById('main')
    main.textContent = ''
    main.appendChild(createContact())
  }
  
export {
    loadContact
};
const Card = (weatherData) => {
  const img = document.getElementById('condition-icon');
  const conditionText = document.getElementById('condition-text');
  const city = document.getElementById('city');
  const region = document.getElementById('region');
  const country = document.getElementById('country');
  const card = {
    city: weatherData.location.name,
    region: weatherData.location.region,
    country: weatherData.location.country,
    data: weatherData,
    conditionIcon: weatherData.current.condition.icon,
    conditionText: weatherData.current.condition.text,
  };

  city.textContent = card.city;
  region.textContent = card.region;
  country.textContent = card.country;
  img.src = card.conditionIcon;
  conditionText.textContent = card.conditionText;
  document.getElementById('content').style.display = 'flex';
  console.log(card.data);
};

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=0be1bec0964140f0a6f162836230904&q=${city}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    Card(weatherData);
  } catch (error) {
    throw new Error(error);
  }
}

function addEventListenerOnButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.id === 'search-button') {
        const city = document.getElementById('search-bar').value;
        if (city === '') return false;
        e.preventDefault();
        getWeather(city);
      }
    });
  });
}

addEventListenerOnButtons();

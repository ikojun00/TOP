const Card = (weatherData) => {
  const img = document.getElementById('conditionIcon');
  img.src = weatherData.current.condition.icon;
  const card = {
    city: weatherData.location.name,
    region: weatherData.location.region,
    country: weatherData.location.country,
    temp: `${weatherData.current.temp_c} °C`,
  };
  const keys = Object.keys(card);
  keys.forEach((key) => {
    const content = document.getElementById(`${key}`);
    content.innerHTML = '';
    const text = document.createTextNode(`${card[key]}`);
    content.appendChild(text);
  });
  document.getElementById('content').style.display = 'flex';
  console.log(weatherData);
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

const fetch = require('node-fetch');

const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = 'caab6267314b8e6ea84310000bb625d5';
const CITY = 'Mumbai';

const url = `${BASE_URL}?q=${CITY}&units=metric&appid=${API_KEY}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("Date:", new Date(data.dt * 1000));
        console.log("Weather:", data.weather[0].main);
        console.log('Current Temperature:', data.main.temp, '°C');
        console.log("Feels Like:", data.main.feels_like, '°C');
        console.log("Min Temperature:", data.main.temp_min, '°C');
        console.log("Max Temperature:", data.main.temp_max, '°C');
        console.log('Current Humidity:', data.main.humidity + '%');
        console.log('Current Pressure:', data.main.pressure, "hPa");
        console.log("Visibility", data.visibility, 'm');
        console.log("Wind Speed:", data.wind.speed, 'm/s');
        console.log("Wind Direction:", data.wind.deg + '°');
        console.log("Clouds:", data.clouds.all + '%');
        console.log("Sunrise:", new Date(data.sys.sunrise * 1000));
        console.log("Sunset:", new Date(data.sys.sunset * 1000));
        console.log("Timezone:", new Date(data.timezone * 1000));
    })
    .catch(error => console.error("Error fetching weather data:", error));

const fetch = require('node-fetch');

const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?";
const API_KEY = 'caab6267314b8e6ea84310000bb625d5';
const CITY = 'Mumbai';

const url = `${BASE_URL}appid=${API_KEY}&q=${CITY}&units=metric`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.list.length; i += 8) {
            const weatherData = data.list[i];
            const date = new Date(weatherData.dt * 1000);

            console.log("Date:", date);
            console.log("Weather:", weatherData.weather[0].main);
            console.log("Min Temperature:", weatherData.main.temp_min, '°C');
            console.log("Max Temperature:", weatherData.main.temp_max, '°C');
            console.log('Humidity:', weatherData.main.humidity + '%');
            console.log('Pressure:', weatherData.main.pressure, "hPa");
            console.log("Wind Speed:", weatherData.wind.speed, 'm/s');
            console.log("Wind Direction:", weatherData.wind.deg + '°');
            console.log("Clouds:", weatherData.clouds.all + '%');
            console.log("Visibility:", weatherData.visibility, 'm');
            console.log("Probability of Precipitation:", weatherData.pop * 100 + '%');
            console.log("\n***********************************************************************************\n");
        }
    })
    .catch(error => console.error("Error fetching weather data:", error));
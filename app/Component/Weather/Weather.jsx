import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
    const API_KEY = 'caab6267314b8e6ea84310000bb625d5';
    const CITY = 'Mumbai';

    const url = `${BASE_URL}?q=${CITY}&units=metric&appid=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => console.error("Error fetching weather data:", error));
  }, []);

  return (
    <div>
      {weatherData && (
        <>
          <p>Date: {new Date(weatherData.dt * 1000).toString()}</p>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Current Temperature: {weatherData.main.temp} °C</p>
          <p>Feels Like: {weatherData.main.feels_like} °C</p>
          <p>Min Temperature: {weatherData.main.temp_min} °C</p>
          <p>Max Temperature: {weatherData.main.temp_max} °C</p>
          <p>Current Humidity: {weatherData.main.humidity}%</p>
          <p>Current Pressure: {weatherData.main.pressure} hPa</p>
          <p>Visibility: {weatherData.visibility} m</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Wind Direction: {weatherData.wind.deg}°</p>
          <p>Clouds: {weatherData.clouds.all}%</p>
          <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toString()}</p>
          <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toString()}</p>
          <p>Timezone: {new Date(weatherData.timezone * 1000).toString()}</p>
        </>
      )}
    </div>
  );
};

export default Weather;

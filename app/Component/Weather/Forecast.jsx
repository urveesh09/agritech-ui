import React, { useEffect, useState } from 'react';

const Forecast = () => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast";
    const API_KEY = 'caab6267314b8e6ea84310000bb625d5';
    const CITY = 'Mumbai';

    const url = `${BASE_URL}?appid=${API_KEY}&q=${CITY}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setForecastData(data.list);
      })
      .catch(error => console.error("Error fetching weather data:", error));
  }, []);

  return (
    <div>
      {forecastData && forecastData.map((weatherData, i) => (
        <div key={i}>
          <h3>Date: {new Date(weatherData.dt * 1000).toString()}</h3>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Min Temperature: {weatherData.main.temp_min} °C</p>
          <p>Max Temperature: {weatherData.main.temp_max} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Wind Direction: {weatherData.wind.deg}°</p>
          <p>Clouds: {weatherData.clouds.all}%</p>
          <p>Visibility: {weatherData.visibility} m</p>
          <p>Probability of Precipitation: {weatherData.pop * 100}%</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;

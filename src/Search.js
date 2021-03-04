import "./App.css";
import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState(null);
  const [info, setInfo] = useState(null);

  function displayInfo(response) {
    let iconURL = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    setInfo(
      <ul>
        <li>Temperature: {Math.round(response.data.main.temp)}°C</li>
        <li>Description: {response.data.weather[0].main}</li>
        <li>Humidity: {response.data.main.humidity}%</li>
        <li>Wind: {Math.round(response.data.wind.speed)} km/h</li>
        <img src={iconURL} alt="icon" />
      </ul>
    );
  }

  function handleCity(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2fb16a57cb4b18c7686f92b2ebb6446f&units=metric`;
    axios.get(apiUrl).then(displayInfo);
  }

  function submitCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="Search">
      <h1>{city}</h1>
      <form id="location-form" onSubmit={handleCity}>
        <input
          type="text"
          id="city-input"
          placeholder="   Search a city..."
          autocomplete="off"
          autofocus="on"
          onChange={submitCity}
        />
        <input id="button" type="submit" value="🔍" />
      </form>
      <p>{info}</p>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import "./Weather.css";
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
  const inputRef = useRef();
  const [weather, setWeather] = useState(null); 

  const icons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,  
    "10n": rain_icon, 
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fc996bd78772be0240151abad27a994a`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();  
      console.log("Weather data:", data);  
      
      const icon = icons[data.weather[0].icon] || clear_icon;
      
      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch (error) {
      console.error("Error fetching weather data:", error); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search(inputRef.current.value);
    }
  };

  return (
    <div className='weathers'>
      <div className='searchBar'>
        <input type="text" placeholder='Search...' ref={inputRef} onKeyDown={handleKeyPress} />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>
      
      {weather ? (
        <>
          <img src={weather.icon} className='weatherIcon' alt="Weather Icon" /> 
          <p className='temp'>{weather.temperature}°C</p>
          <p className='location'>{weather.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weather.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weather.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Enter the Location...</p>
      )}
    </div>
  );
};

export default Weather;

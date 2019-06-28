import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState([])
  
    useEffect(() => {
      let isCancelled = false
      const url = `http://api.apixu.com/v1/current.json?key=d957cdbf8ae24cf0883130738192006&q=${capital}`
      axios
        .get(url)
        .then(res => {
          if (!isCancelled) {
            setWeather({
              location: res.data.location.name,
              icon: res.data.current.condition.icon,
              temperature: res.data.current.temp_c,
              condition: res.data.current.condition.text,
              wind: res.data.current.wind_kph
            })
          }
        })
      return () => {
        isCancelled = true
      }
    }, [capital])
  
    return (
      <div>
        <h2>Weather in {weather.location}</h2>
        <img src={weather.icon} alt="weather_icon" />
        <h3>Condition: {weather.condition}</h3>
        <h3>Temperature: {weather.temperature}&deg;C </h3>
        <h3>Wind: {Math.round(weather.wind / 3.6)} m/s</h3>
      </div>
    )
  }

  export default Weather
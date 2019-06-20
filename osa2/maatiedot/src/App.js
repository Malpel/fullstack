import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

const Filter = ({ filter }) => {
  return (
    <div>
      <p>Find countries: </p> <input onChange={filter} />
    </div>
  )
}

const Button = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>Show</button>
  )
}

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([])
  
  useEffect(() => {
    const url = `http://api.apixu.com/v1/current.json?key=d957cdbf8ae24cf0883130738192006&q=${capital}`
    axios
      .get(url)
      .then(res => {
        setWeather({
          location: res.data.location.name,
          icon: res.data.current.condition.icon,
          temperature: res.data.current.temp_c,
          condition: res.data.current.condition.text,
          wind: res.data.current.wind_kph
        })
      })
  }, [capital])

  return (
    <div>
      <h2>Weather in {weather.location}</h2>
      <img src={weather.icon} alt="weather_icon" />
      <h3>Temperature: {weather.temperature}&deg;C, {weather.condition} </h3>
      <h3>Wind: {Math.round(weather.wind / 3.6)} m/s</h3>
    </div>
  )
}

const Countries = ({ countries, handleClick }) => {

  if (countries.length === 1 && countries[0].name !== 'too many matches') {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages: </h3>
        <ul>
          {country.languages.map((language) => {
            return (
              <li key={language.name}>{language.name}</li>
            )
          })}
        </ul>
        <img src={country.flag} alt="flag" width="500" height="300" />
        <Weather capital={country.capital} />
      </div>
    )
  } else {
    return (
      <div>
        {countries.map((country) => {
          if (country.name !== 'too many matches') {
            return (
              <p key={country.name}>{country.name}  <Button handleClick={() => handleClick(country)} /></p>
            )
          } else {
            return <p key={country.name}>{country.name}</p>
          }
        })}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const filterChange = (event) => {
    const arr = countries.filter(country => country.name.toUpperCase()
      .indexOf(event.target.value.toUpperCase()) > -1)
    filterCountries(arr, event.target.value)
  }

  const filterCountries = (arr, filter) => {
    if (arr.length > 10 && filter !== '') {
      setFilteredCountries([{ name: 'too many matches' }])
    } else if (arr.length > 0 && arr.length < 10) {
      setFilteredCountries(arr)
    } else {
      setFilteredCountries([])
    }
  }

  const handleClick = (country) => {
    setFilteredCountries([country])
    console.log(filteredCountries)
  }

  return (
    <div>
      <Filter filter={filterChange} />
      <Countries
        countries={filteredCountries}
        handleClick={handleClick}
      />
    </div>
  )
}


export default App;

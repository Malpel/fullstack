import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Filter from './components/Filter'
import Countries from './components/Countries'


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

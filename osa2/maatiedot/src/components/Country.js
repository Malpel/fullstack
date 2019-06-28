import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
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
          <img src={country.flag} alt="flag" width="325" height="175" />
          <Weather capital={country.capital} />
        </div>
    )
  }

  export default Country
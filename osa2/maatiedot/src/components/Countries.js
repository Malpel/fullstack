import React from 'react'
import Country from './Country'

const Countries = ({ countries, handleClick }) => {

    if (countries.length === 1 && countries[0].name !== 'too many matches') {
      const country = countries[0]
      return (
        <Country country={country}/>
      )
    } else {
      return (
        <div>
          {countries.map((country) => {
            if (country.name !== 'too many matches') {
              return (
                <p key={country.name}>{country.name}  <button onClick={() => handleClick(country)}>Show</button></p>
              )
            } else {
              return <p key={country.name}>{country.name}</p>
            }
          })}
        </div>
      )
    }
  }

  export default Countries
import React from 'react'

const Filter = ({ filter }) => {
    return (
      <div>
        <p>Find countries: </p> <input onChange={filter} />
      </div>
    )
  }

  export default Filter
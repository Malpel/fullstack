import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ filterNames }) => {
  return (
    <div>
      filter people: <input onChange={filterNames} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>

  )
}
const Numbers = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => {
        return <p key={person.name}>{person.name} {person.number}</p>
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState(persons)


  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(res => {
      setPersons(res.data)
      setFilteredNames(res.data)
    })
  }, [])
  console.log('render', persons.length, 'notes')


  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} exists already`)
    } else {
      const arr = persons.concat({ name: newName, number: newNumber })
      setPersons(arr)
      setFilteredNames(arr)
      setNewName('')
      setNewNumber('')
      setFilter('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChange = (filter) => {
    setFilteredNames(persons.filter(person => person.name.toUpperCase()
      .indexOf(filter.toUpperCase()) > -1))
  }

  const filterNames = (event) => {
    filterChange(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterNames={filterNames} />
      <h2>Add new contact</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers persons={filteredNames} />
    </div>
  )

}

export default App
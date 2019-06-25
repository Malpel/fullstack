import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Button = ({ handleDelete }) => {
  return (
    <button onClick={handleDelete}>Delete</button>
  )
}

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
const Numbers = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <p key={person.name}>{person.name} {person.number}  <Button
            handleDelete={() => handleDelete(person.id, person.name)} />
          </p>
        )
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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredNames(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'notes')

  const addName = (event) => {
    event.preventDefault()
    const lastId = persons[persons.length - 1].id
    const person = persons.find(person => person.name === newName)
    if (person !== undefined) {
      if (window.confirm(`Contact ${newName} exists already,
       replace the old number with a new one?`)) {
        personService
          .update(person.id, { name: newName, number: newNumber, id: person.id })
          .then(() => {
            personService
              .getAll()
              .then(initialPersons => {
                setPersons(initialPersons)
                setFilteredNames(initialPersons)
                setNewName('')
                setNewNumber('')
              })
          })
      }

    } else {
      personService
        .create({ name: newName, number: newNumber, id: lastId + 1 })
        .then(returnedPersons => {
          const arr = persons.concat(returnedPersons)
          setPersons(arr)
          setFilteredNames(arr)
          setNewName('')
          setNewNumber('')
        })
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          personService
            .getAll()
            .then(persons => {
              const arr = persons
              setPersons(arr)
              setFilteredNames(arr)
            })
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterNames={filterNames} />
      <h2>Add a new contact</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers persons={filteredNames} handleDelete={handleDelete} />
    </div>
  )

}

export default App
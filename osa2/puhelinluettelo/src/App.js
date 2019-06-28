import React, { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState()

  const getAllContacts = () => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
        setFilteredContacts(initialContacts)
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        setMessageType('error')
        setMessage('Error: couldn\'t retrieve phonenbook', error)
      })
  }

  const notify = (type, action, name) => {
    if (type === 'success') {
      setMessageType('success')
      switch (action) {
        case 'add':
          setMessage(`Added ${name}`)
          break;
        case 'update':
          setMessage(`Updated ${name}'s number`)
          break;
        case 'delete':
          setMessage(`Deleted ${name}`)
          break;
        default:
      }
    } else {
      setMessageType('error')
      setMessage(`Error: ${name} has already been deleted from server`)
    }
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  }

  useEffect(() => {
    getAllContacts()
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const lastId = contacts[contacts.length - 1].id
    const contact = contacts.find(contact => contact.name === newName)


    if (contact !== undefined) {
      // update
      if (window.confirm(`Contact ${newName} exists already,
       replace the old number with a new one?`)) {
        contactService
          .update(contact.id, { name: newName, number: newNumber, id: contact.id })
          .then(() => {
            getAllContacts()
            setNewName('')
            setNewNumber('')
            notify('success', 'update', newName)
          })
          .catch(error => {
            notify('error', 'update', newName)
            getAllContacts()
          })
      }
    } else {
      // add new
      contactService
        .create({ name: newName, number: newNumber, id: lastId + 1 })
        .then(returnedContact => {
          const arr = contacts.concat(returnedContact)
          setContacts(arr)
          setFilteredContacts(arr)
          setNewName('')
          setNewNumber('')
          notify('success', 'add', newName)
        })
        .catch(error => {
          notify('error', 'add', newName)
          getAllContacts()
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
    setFilteredContacts(contacts.filter(contact => contact.name.toUpperCase()
      .indexOf(filter.toUpperCase()) > -1))
  }

  const filterContacts = (event) => {
    filterChange(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService
        .remove(id)
        .then(() => {
          contactService
            .getAll()
            .then(contacts => {
              const arr = contacts
              setContacts(arr)
              setFilteredContacts(arr)
            })
        })
        .catch(error => {
          notify('error', 'delete', name)
          getAllContacts()
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} type={messageType} />
      <Filter filterContacts={filterContacts} />
      <h2>Add a new contact</h2>
      <ContactForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Contacts</h2>
      <Contacts contacts={filteredContacts} handleDelete={handleDelete} />
    </div>
  )
}

export default App
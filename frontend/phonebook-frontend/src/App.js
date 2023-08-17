import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showNotification = (message, type='info') => {
    if (type === 'error') {
      setError(true)
    }
    setNotification(message)

    setTimeout(() => {
      setNotification(null)
      setError(false)
    }, 5000)
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.erase(person.id)

      setPersons(persons.filter(persons => persons.id !== person.id))
      showNotification(`Deleted ${person.name}`)
    }
  }

  const updatePerson = (person) => {
    if (window.confirm(`${newName} is already added to phonebook, replace
      the old number with a new one?`)) {

        personService.update(person.id, {name: newName, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            showNotification(`Updated number for ${newName}`)
          })
          .catch(error => {
            let ermessage = JSON.stringify(error.response.data.error)
            // Check if the error matches the start of validation error message
            if (ermessage.substring(1,11) === 'Validation') {
              showNotification(`${error.response.data.error}`, 'error')
            } else {
              showNotification(`${person.name} has already been removed`, 'error')
              setPersons(persons.filter(p => p.id !== person.id))
            }
          })
          
          clearForm()
    }
  }

  const addPerson = (e) => {
    e.preventDefault()

    const person = persons.find(p => p.name === newName)

    if (person) {
      updatePerson(person)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      showNotification(`Added ${newName}`)
      })
      .catch(error => {
        showNotification(`${error.response.data.error}`, 'error')
      })
    clearForm()
    }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const numbersToShow = (filter.length === 0)
    ? persons
    : persons.filter(value => value.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} error={error} />  
      <Filter handleChange={handleFilter} filter={filter} />

      <h3>Add a new number</h3>

      <PersonForm handleSubmit={addPerson}
        nameChange={handleNameChange} name={newName}
        numberChange={handleNumberChange} number={newNumber}
      />
      
      <h3>Numbers</h3>

      <Persons persons={numbersToShow} handleDelete={deletePerson} />
    </div>
  )

}

export default App
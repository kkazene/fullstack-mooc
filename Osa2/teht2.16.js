import React from 'react';
import personService from './services/persons'

const Filter = ({ filterValue, updateFilter }) => (
  <div>
    rajaa näytettäviä: <input value={filterValue} onChange={updateFilter} />
  </div>
)

const AddNewForm = ({ newName, newNumber, addNumber, updateName, updateNumber}) => (
  <form onSubmit={addNumber}>
    <div>
      nimi: <input value={newName} onChange={updateName} />
    </div>
    <div>
      ninumero: <input value={newNumber} onChange={updateNumber} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
</form>
)

const PersonsList = ({ persons, removeNumber }) => (
  <table>
    <tbody>
      {persons.map(person =>
        <tr key={person.name}>
          <td>{person.name}</td>
          <td>{person.number}</td>
          <td><button onClick={() => removeNumber(person)}type="button">poista</button></td>
        </tr>)
      }
    </tbody>
  </table>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      filterValue: '',
      newName: '',
      newNumber: '',
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
    })
  }

  updateFilter = (e) => {
    this.setState({ filterValue: e.target.value })
  }

  updateName = (e) => {
    this.setState({ newName: e.target.value })
  }
  
  updateNumber = (e) => {
    this.setState({ newNumber: e.target.value })
  }

  addNumber = (e) => {
    e.preventDefault()
    const { persons, newName, newNumber } = this.state
    const value = persons.map(per => per.name)
    if (value.indexOf(newName) > 0)
      console.log(newName, 'already exists!')
    else {
      const personObject = ({ name: newName, number: newNumber })
      personService.create(personObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: ''
        })
      })
    }
  }
  
  removeNumber = ({ id, name }) => {
    const result = window.confirm(`poistetaanko ${name}`);
    if (result) {
      personService.remove(id)
        .then(response => {
          this.setState({ persons: this.state.persons.filter(n => n.id !== id) })
        })
    }
  }

  render() {
    const { persons, filterValue, newName, newNumber } = this.state
    const personsToShow = filterValue.length ?
      persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
      : persons
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Filter filterValue={filterValue} updateFilter={this.updateFilter} />
        <h2>Lisää uusi</h2>
          <AddNewForm
            newName={newName}
            newNumber={newNumber}
            addNumber={this.addNumber}
            updateName={this.updateName}
            updateNumber={this.updateNumber} />
        <h2>Numerot</h2>
        <PersonsList persons={personsToShow} filter={filterValue} removeNumber={this.removeNumber} />
      </div>
    )
  }
}

export default App
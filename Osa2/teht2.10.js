import React from 'react';

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

const PersonsList = ({ persons }) => (
  <table>
    <tbody>
      {persons.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>) }
    </tbody>
  </table>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      filterValue: '',
      newName: '',
      newNumber: '',
    }
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
      const newPersons = persons.concat({ name: newName, number: newNumber })
      this.setState({ persons: newPersons, newName: '', newNumber: '' })
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
        <PersonsList persons={personsToShow} filter={filterValue} />
      </div>
    )
  }
}

export default App
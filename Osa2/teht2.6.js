import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  updateName = (e) => {
    this.setState({ newName: e.target.value })
  }

  addNumber = (e) => {
    e.preventDefault()
    const { persons, newName } = this.state
    const newPersons = persons.concat({ name: newName })
    this.setState({ persons: newPersons, newName: '' })
  }
    

  render() {
    const { persons, newName } = this.state
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addNumber}>
          <div>
            nimi: <input value={newName} onChange={this.updateName} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {persons.map(person => <p key={person.name}>{person.name}</p>) }
      </div>
    )
  }
}

export default App
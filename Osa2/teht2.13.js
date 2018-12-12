import React from 'react';
import axios from 'axios'

const Filter = ({ filterValue, updateFilter }) => (
  <div>
    find countries: <input value={filterValue} onChange={updateFilter} />
  </div>
)

const CountriesList = ({ countries, setFilter }) => {
  return (
  <div>
    {countries.length <= 10 ?
      countries.map(country => <div onClick={() => setFilter(country.name)} key={country.name}>{country.name}</div>)
    :
    <p>too many matches, specify another filter</p>
    }
  </div>
  )
}

const CountryInfo = ({ country }) => (
  <div>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <img src={country.flag} alt="flag"></img>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValue: '',
      countries: [],
    }
  }

  componentDidMount() {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      this.setState({ countries: response.data })
    })
  }

  updateFilter = (e) => {
    this.setState({ filterValue: e.target.value })
  }

  setFilter = (name) => {
    this.setState({filterValue: name })
  }

  render() {
    const { filterValue, countries } = this.state
    const countriesToShow = filterValue.length ?
      countries.filter(country => country.name.toLowerCase().includes(filterValue.toLowerCase()))
      : countries
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Filter filterValue={filterValue} updateFilter={this.updateFilter} />
        {countriesToShow.length === 1 ?
          <CountryInfo country={countriesToShow[0]} />
        :
          <CountriesList countries={countriesToShow} setFilter={this.setFilter} />
        }
      </div>
    )
  }
}

export default App
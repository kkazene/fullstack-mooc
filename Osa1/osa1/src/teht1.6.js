import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Stats = ({ text, number }) => (
  <div>
    <p>{text} {number}</p>
  </div>
)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    }
  }

  render() {
    const {
      good,
      neutral,
      bad,
    } = this.state;
    return (
      <div>
        <Header text={'anna palautetta'} />
        <Button handleClick={() => this.setState({ good: good + 1 })} text={'hyvä'} />
        <Button handleClick={() => this.setState({ neutral: neutral + 1 })} text={'neutraali'} value={'neutral'} />
        <Button handleClick={() => this.setState({ bad: bad + 1 })} text={'huono'} value={'bad'}/>
        <Header text={'statistiikka'} />
        <Stats text={'hyvä'} number={good} />
        <Stats text={'neutraali'} number={neutral} />
        <Stats text={'huono'} number={bad} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
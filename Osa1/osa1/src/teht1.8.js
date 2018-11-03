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

const Statistic = ({ text, number }) => (
  <div>
    <p>{text} {number}</p>
  </div>
)

const Statistics = ({ good, neutral, bad, average, positives }) => (
  <div>
    <Header text={'statistiikka'} />
    <Statistic text={'hyvä'} number={good} />
    <Statistic text={'neutraali'} number={neutral} />
    <Statistic text={'huono'} number={bad} />
    <Statistic text={'keskiarvo'} number={average} />
    <Statistic text={'positiivisia'} number={positives} />
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
    const average = () => {
      if (good + bad + neutral > 0) {
        return ((good*1) + (neutral*0) + (bad*-1))/(good + bad + neutral)
      } else return 0
    }
    const positives = () => {
      if (good + bad + neutral > 0)
        return (good/(good + bad + neutral))
      else return 0
    }
    return (
      <div>
        <Header text={'anna palautetta'} />
        <Button handleClick={() => this.setState({ good: good + 1 })} text={'hyvä'} />
        <Button handleClick={() => this.setState({ neutral: neutral + 1 })} text={'neutraali'} value={'neutral'} />
        <Button handleClick={() => this.setState({ bad: bad + 1 })} text={'huono'} value={'bad'}/>
        <Statistics good={good} neutral={neutral} bad={bad} average={average()} positives={`${positives()} %`} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
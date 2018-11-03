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
    const feedbackGiven = good + neutral + bad ? true : false
    const average = () => {
      if (feedbackGiven) {
        return ((good*1) + (neutral*0) + (bad*-1))/(good + bad + neutral)
      } else return 0
    }
    const positives = () => {
      if (feedbackGiven)
        return (good/(good + bad + neutral))
      else return 0
    }

    const handleClick = (key) => {
      this.setState({ [key]: this.state[key] + 1 })
    }
    return (
      <div>
        <Header text={'anna palautetta'} />
        <Button handleClick={() => handleClick('good')} text={'hyvä'} />
        <Button handleClick={() => handleClick('neutral')} text={'neutraali'} value={'neutral'} />
        <Button handleClick={() => handleClick('bad')} text={'huono'} value={'bad'}/>
        <Header text={'statistiikka'} />
        {feedbackGiven ?
          <Statistics good={good} neutral={neutral} bad={bad} average={average()} positives={`${positives()} %`} />
        :
        <p>ei yhtään palautetta annettu</p>
        }
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  vote = (anecdote) => {
    this.props.store.dispatch(addVote(anecdote.id))
    this.props.store.dispatch(addNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      this.props.store.dispatch(removeNotification())
    }, 5000)
  }
  render() {
    const { anecdotes, filter } = this.props.store.getState()
    const aToShow = anecdotes.filter(a => a.content.includes(filter))
    return (
      <div>
        <h2>Anecdotes</h2>
        {aToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList

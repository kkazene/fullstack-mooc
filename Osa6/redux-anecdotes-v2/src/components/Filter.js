import React from 'react'
import { updateFilter } from '../reducers/filterReducer'
class Filter extends React.Component {
  handleChange = (event) => {
    this.props.store.dispatch(updateFilter(event.target.value))
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default Filter
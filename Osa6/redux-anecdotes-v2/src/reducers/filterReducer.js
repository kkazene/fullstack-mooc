const filterAtStart = ''

export const updateFilter = (content) => {
  return {
    type: 'FILTER',
    content
  }
}

const filterReducer = (store = filterAtStart, action) => {
  if (action.type==='FILTER') {
    return action.content
  }

  return store
}

export default filterReducer
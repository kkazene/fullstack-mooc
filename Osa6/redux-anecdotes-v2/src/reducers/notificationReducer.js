const notificationAtStart = [
  'Nothing to say'
]


export const setNotification = (content) => {
  return {
    type: 'SET',
    content
  }
}

const notificationReducer = (store = notificationAtStart, action) => {
  if (action.type==='SET') {
    return [action.content]
  }

  return store
}

export default notificationReducer
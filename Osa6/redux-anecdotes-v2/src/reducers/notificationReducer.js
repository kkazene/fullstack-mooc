const notificationAtStart = 'Nothing to say'


export const addNotification = (content) => {
  return {
    type: 'SET',
    content
  }
}

export const removeNotification = () => {
  return {
    type: 'UNSET',
  }
}

const notificationReducer = (store = notificationAtStart, action) => {
  if (action.type==='SET') {
    return action.content
  }
  if (action.type==='UNSET') {
    return ''
  }

  return store
}

export default notificationReducer
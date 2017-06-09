const favorite = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return action.movie
    case 'SET_FAVORITES':
      return action.movie
    default:
      return state
  }
}

const favorites = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [
        ...state,
        favorite(undefined, action)
      ]
    case 'SET_FAVORITES':
      return state.map(t =>
        favorite(t, action)
      )
    default:
      return state
  }
}

export default favorites

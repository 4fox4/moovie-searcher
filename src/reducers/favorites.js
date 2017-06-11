const favorite = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return action.item
    case 'DELETE_FAVORITE':
      var newItems = action.items.slice()
      var pos = newItems.indexOf(action.item)
      newItems.splice(pos, 1)
      return newItems
    case 'SET_FAVORITES':
      return action.items
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
    case 'DELETE_FAVORITE':
      return favorite(undefined, action)
    case 'SET_FAVORITES':
      return favorite(undefined, action)
    default:
      return state
  }
}

export default favorites

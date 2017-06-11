export const addFavorite = (item) => {
  return {
    type: 'ADD_FAVORITE',
    item: item
  }
}

export const deleteFavorite = (items, item) => {
  return {
    type: 'DELETE_FAVORITE',
    items: items,
    item: item
  }
}

export const setFavorites = (items) => {
  return {
    type: 'SET_FAVORITES',
    items: items
  }
}

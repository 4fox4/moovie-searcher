import { combineReducers } from 'redux'
import favorites from './favorites'

const movieSearcherApp = combineReducers({
  favorites
})

export default movieSearcherApp

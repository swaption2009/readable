import { combineReducers } from 'redux'
import { FETCH_CATEGORIES } from "../actions";

function categories(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        [action.payload.data.categories]: action.payload.data
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
})
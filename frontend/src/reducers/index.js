import { combineReducers } from 'redux'
import { FETCH_CATEGORIES } from "../actions";

function categories(state = {}, action) {
  // console.log(action)
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload.data.categories
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
})
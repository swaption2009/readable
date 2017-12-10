import { combineReducers } from 'redux'
import { FETCH_CATEGORIES, FETCH_POSTS } from "../actions";

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

function posts(state = {}, action) {
  // console.log(action.payload)
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.data
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})
import { combineReducers } from 'redux'
import { FETCH_CATEGORIES, FETCH_POSTS, FETCH_POST, FETCH_COMMENTS } from "../actions";

function categories(state = {}, action) {
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
  switch (action.type) {
    case FETCH_POST:
      return {
        post: action.payload.data
      }
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.data
      }
    default:
      return state
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload.data
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
})
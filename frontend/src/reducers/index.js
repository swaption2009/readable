import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_COMMENTS,
  CREATE_COMMENT, POST_VOTE,
} from "../actions";

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
    case POST_VOTE:
      // TODO add or minus voteScore from a Post
      return state
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
    case POST_VOTE:
    // TODO add or minus voteScore from a Comment
      return state
    case CREATE_COMMENT:
      const newComment = JSON.parse(action.payload.config.data)
      // TODO replace "newComments" with "comments"
      return {
        ...state,
        newComments: [...state.comments, newComment]
      }
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
  form: formReducer,
})
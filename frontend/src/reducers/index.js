import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_COMMENTS,
  CREATE_COMMENT,
  POST_VOTE, COMMENT_VOTE,
} from '../actions';

function categories(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload.data.categories,
      };
    default:
      return state;
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case POST_VOTE:
      if (!state.posts) {
        return {
          ...state,
          post: action.payload.data,
        };
      } else {
        return {
          ...state,
          posts: state.posts
            .filter(post => post.id !== action.payload.data.id)
            .concat(action.payload.data),
        };
      }

    case FETCH_POST:
      return {
        post: action.payload.data,
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.data,
      };
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case COMMENT_VOTE:
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload.data.id)
          .concat(action.payload.data),
      };
    case CREATE_COMMENT:
      const newComment = JSON.parse(action.payload.config.data);
      return {
        ...state,
        comments: [...state.comments, newComment],
      };
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload.data,
      };
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
  form: formReducer,
});

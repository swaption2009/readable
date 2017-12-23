import {
  FETCH_CATEGORIES,
  fetchCategories,
} from './ActionsCategory';
import {
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  fetchPosts,
  fetchPost,
  createPost,
  deletePost,
  editPost
} from './ActionsPost';
import {
  FETCH_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  fetchComments,
  createComment,
  deleteComment,
  editComment,
} from './ActionsComment';
import {
  POST_VOTE,
  COMMENT_VOTE,
  postVote,
  commentVote,
} from './ActionsVote';

export {
  fetchCategories,
  fetchPosts,
  fetchPost,
  createPost,
  deletePost,
  editPost,
  fetchComments,
  createComment,
  deleteComment,
  editComment,
  postVote,
  commentVote,
  FETCH_CATEGORIES,
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  FETCH_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  POST_VOTE,
  COMMENT_VOTE,
};

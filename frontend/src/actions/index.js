import axios from 'axios'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'

export const CREATE_POST = 'CREATE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'

export const POST_VOTE = 'POST_VOTE'
export const COMMENT_VOTE = 'COMMENT_VOTE'

export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'

const ROOT_URL = "http://localhost:3001"

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`,
    {
      headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: FETCH_CATEGORIES,
    payload: request
  }
}

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`,
    {
      headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`,
    {
      headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function fetchComments(parentId) {
  const request = axios.get(`${ROOT_URL}/posts/${parentId}/comments`,
    {
      headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: FETCH_COMMENTS,
    payload: request
  }
}

export function createPost(newPost) {
  const request = axios.post(`${ROOT_URL}/posts`, newPost,
    { headers:
      {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
  })

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function createComment(newComment) {
  const request = axios.post(`${ROOT_URL}/comments`, newComment,
    { headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: CREATE_COMMENT,
    payload: request
  }
}

export function postVote(id, option) {
  const request = axios.post(`${ROOT_URL}/posts/${id}`, option,
    { headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: POST_VOTE,
    payload: request
  }
}

export function commentVote(id, option) {
  const request = axios.post(`${ROOT_URL}/comments/${id}`, option,
    { headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: COMMENT_VOTE,
    payload: request
  }
}

export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}`,
    { headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: DELETE_POST,
    payload: request
  }
}

export function deleteComment(id) {
  const request = axios.delete(`${ROOT_URL}/comments/${id}`,
    { headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: DELETE_COMMENT,
    payload: request
  }
}

export function editPost(editPost, id) {
  const request = axios.put(`${ROOT_URL}/posts/${id.id}`, editPost,
    { headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: EDIT_POST,
    payload: request
  }
}

export function editComment(editComment, id) {
  const request = axios.put(`${ROOT_URL}/comments/${id}`, editComment,
    { headers:
        {'Content-Type': 'application/json', 'Authorization': 'udarocks'}
    })

  return {
    type: EDIT_POST,
    payload: request
  }
}
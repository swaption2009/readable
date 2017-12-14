import axios from 'axios'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const CREATE_POST = 'CREATE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const POST_VOTE = 'POST_VOTE'

const ROOT_URL = "http://localhost:3001"

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`, {headers: {Authorization: 'udarocks'}})

  return {
    type: FETCH_CATEGORIES,
    payload: request
  }
}

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`, {headers: {Authorization: 'udarocks'}})

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`, {headers: {Authorization: 'udarocks'}})

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function fetchComments(parentId) {
  const request = axios.get(`${ROOT_URL}/posts/${parentId}/comments`, {headers: {Authorization: 'udarocks'}})

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
  const request = axios.post(`${ROOT_URL}/posts/comments`, newComment,
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
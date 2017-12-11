import axios from 'axios'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'

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

import axios from 'axios';
import ROOT_URL from '../helpers/Api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`,
    {
      headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
    });

  return {
    type: FETCH_POSTS,
    payload: request,
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`,
    {
      headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
    });

  return {
    type: FETCH_POST,
    payload: request,
  };
}

export function createPost(newPost) {
  const request = axios.post(`${ROOT_URL}/posts`, newPost,
    { headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
  });

  return {
    type: CREATE_POST,
    payload: request,
  };
}

export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}`,
    { headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
  });

  return {
    type: DELETE_POST,
    payload: request,
  };
}

export function editPost(editPost, id) {
  const request = axios.put(`${ROOT_URL}/posts/${id.id}`, editPost,
    { headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
  });

  return {
    type: EDIT_POST,
    payload: request,
  };
}

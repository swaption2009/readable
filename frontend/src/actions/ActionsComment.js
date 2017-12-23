import axios from 'axios';
import ROOT_URL from '../helpers/Api';

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export function fetchComments(parentId) {
  const request = axios.get(`${ROOT_URL}/posts/${parentId}/comments`,
    {
      headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
    });

  return {
    type: FETCH_COMMENTS,
    payload: request,
  };
}

export function createComment(newComment) {
  const request = axios.post(`${ROOT_URL}/comments`, newComment,
    { headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
  });

  return {
    type: CREATE_COMMENT,
    payload: request,
  };
}

export function deleteComment(id) {
  const request = axios.delete(`${ROOT_URL}/comments/${id}`,
    { headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
  });

  return {
    type: DELETE_COMMENT,
    payload: request,
  };
}

export function editComment(editComment, id) {
  const request = axios.put(`${ROOT_URL}/comments/${id}`, editComment,
    { headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
  });

  return {
    type: EDIT_COMMENT,
    payload: request,
  };
}

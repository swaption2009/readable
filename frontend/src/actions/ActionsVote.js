import axios from 'axios';
import ROOT_URL from '../helpers/Api';

export const POST_VOTE = 'POST_VOTE';
export const COMMENT_VOTE = 'COMMENT_VOTE';

export function postVote(id, option) {
  const request = axios.post(`${ROOT_URL}/posts/${id}`, option,
    { headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
  });

  return {
    type: POST_VOTE,
    payload: request,
  };
};

export function commentVote(id, option) {
  const request = axios.post(`${ROOT_URL}/comments/${id}`, option,
    { headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
  });

  return {
    type: COMMENT_VOTE,
    payload: request,
  };
};

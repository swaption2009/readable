import axios from 'axios';
import ROOT_URL from '../helpers/Api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`,
    {
      headers:
        { 'Content-Type': 'application/json',
          'Authorization': 'udarocks' },
    });

  return {
    type: FETCH_CATEGORIES,
    payload: request,
  };
};

import axios from 'axios'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

const ROOT_URL = "http://localhost:3001"

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`, { headers: { Authorization: 'udarocks' } })

  return {
    type: FETCH_CATEGORIES,
    payload: request
  }
}
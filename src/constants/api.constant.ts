const API_BASE_URL = 'http://localhost:3001/api';

export const GET_GITHUB_CONTENT = {
  url: `${API_BASE_URL}/github/content`,
  method: 'GET',
} as const;

export const UPDATE_GITHUB_CONTENT = {
  url: `${API_BASE_URL}/github/content`,
  method: 'PUT',
} as const;

export const DELETE_GITHUB_CONTENT = {
  url: `${API_BASE_URL}/github/content`,
  method: 'DELETE',
} as const;

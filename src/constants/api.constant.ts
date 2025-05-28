const API_BASE_URL = 'http://localhost:3001/api';

export const GET_GITHUB_CONTENT = {
  url: `${API_BASE_URL}/github/contents`,
  method: 'GET',
} as const;

export const UPLOAD_GITHUB_CONTENT = {
  url: `${API_BASE_URL}/github/contents`,
  method: 'PUT',
} as const;

export const UPDATE_GITHUB_CONTENT = {
  url: `${API_BASE_URL}/github/update-contents`,
  method: 'PUT',
} as const;

export const DELETE_GITHUB_CONTENT = {
  url: `${API_BASE_URL}/github/contents`,
  method: 'DELETE',
} as const;

export const GITHUB_USER_INFO = {
  url: `${API_BASE_URL}/github/auth`,
  method: 'POST',
} as const;

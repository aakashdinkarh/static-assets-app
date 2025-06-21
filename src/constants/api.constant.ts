const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const GITHUB_API_BASE_URL = `${API_BASE_URL}/api/github`;

export const GET_GITHUB_CONTENT = {
  url: `${GITHUB_API_BASE_URL}/contents`,
  method: 'GET',
} as const;

export const UPLOAD_GITHUB_CONTENT = {
  url: `${GITHUB_API_BASE_URL}/contents`,
  method: 'PUT',
} as const;

export const UPDATE_GITHUB_CONTENT = {
  url: `${GITHUB_API_BASE_URL}/update-contents`,
  method: 'PUT',
} as const;

export const DELETE_GITHUB_CONTENT = {
  url: `${GITHUB_API_BASE_URL}/contents`,
  method: 'DELETE',
} as const;

export const GITHUB_USER_INFO = {
  url: `${GITHUB_API_BASE_URL}/auth`,
  method: 'POST',
} as const;

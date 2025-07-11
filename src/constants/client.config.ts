const isDev = process.env.NODE_ENV === 'development';

export const CLIENT_URL = isDev ? process.env.REACT_APP_CLIENT_URL : '%%REACT_APP_CLIENT_URL%%';
export const GITHUB_CLIENT_ID = isDev
  ? process.env.REACT_APP_GITHUB_CLIENT_ID
  : '%%REACT_APP_GITHUB_CLIENT_ID%%';
export const API_BASE_URL = isDev
  ? process.env.REACT_APP_API_BASE_URL
  : '%%REACT_APP_API_BASE_URL%%';

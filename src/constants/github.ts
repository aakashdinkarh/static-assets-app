import type { CacheEntry } from 'types/github';

export const GITHUB_CONFIG = {
  CLIENT_ID: process.env.REACT_APP_GITHUB_CLIENT_ID,
  REDIRECT_URI: process.env.REACT_APP_CLIENT_URL + '/repository',
} as const;

// Cache expiration time (2 minutes)
export const CACHE_EXPIRATION = 2 * 60 * 1000;

// In-memory cache object
export const cache: { [key: string]: CacheEntry } = {};

export const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CONFIG.CLIENT_ID}&redirect_uri=${GITHUB_CONFIG.REDIRECT_URI}&scope=public_repo`;

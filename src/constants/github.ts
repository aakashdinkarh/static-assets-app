import type { CacheEntry } from 'types/github';
import { GITHUB_CLIENT_ID, CLIENT_URL } from 'constants/client.config';
import { Routes } from 'constants/route.constant';

export const GITHUB_CONFIG = {
  CLIENT_ID: GITHUB_CLIENT_ID,
  REDIRECT_URI: CLIENT_URL + process.env.PUBLIC_URL! + Routes.loginCallback,
} as const;

// Cache expiration time (2 minutes)
export const CACHE_EXPIRATION = 2 * 60 * 1000;

// In-memory cache object
export const cache: { [key: string]: CacheEntry } = {};


export const GITHUB_AUTH_URL =
  'https://github.com/login/oauth/authorize?' +
  `client_id=${GITHUB_CONFIG.CLIENT_ID}` +
  '&scope=public_repo' +
  `&redirect_uri=${GITHUB_CONFIG.REDIRECT_URI}`;

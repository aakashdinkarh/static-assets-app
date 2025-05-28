import { AUTHORIZATION_COOKIE_NAME, getCookie } from 'utils/cookie.util';

export const getCommonHeaders = () => {
  const authorization = getCookie(AUTHORIZATION_COOKIE_NAME) || '';

  return {
    [AUTHORIZATION_COOKIE_NAME]: authorization,
  };
};

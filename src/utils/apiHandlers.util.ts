import { STORAGE_KEYS } from 'constants/storage.constant';
import { deleteCookie, AUTHORIZATION_COOKIE_NAME } from 'utils/cookie.util';
import { removeFromLocalStorage } from 'utils/storage.util';

export const checkError = async (response: Response) => {
  if (response.ok) return;

  if (response.status === 401) {
    deleteCookie(AUTHORIZATION_COOKIE_NAME);
    removeFromLocalStorage(STORAGE_KEYS.USER_INFO);

    import('store/GithubUserInfoStore')
      .then(module => module.useGithubUserInfoStore.getState())
      .then(({ setUserInfo }) => setUserInfo(null));

    throw new Error('User not logged in or session expired');
  }

  const error = await response.json();
  throw new Error(error.error || 'Failed to fetch repository contents');
};

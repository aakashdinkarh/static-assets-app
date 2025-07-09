import { GITHUB_USER_INFO } from 'constants/api.constant';
import { AUTHORIZATION_COOKIE_NAME, setCookie } from 'utils/cookie.util';
import { checkError } from 'utils/apiHandlers.util';
import { STORAGE_KEYS } from 'constants/storage.constant';
import { setToLocalStorage } from 'utils/storage.util';

type UserInfo = {
  repo: {
    name: string;
    fullName: string;
    branch: string;
    permissions: {
      admin: boolean;
      maintain: boolean;
      push: boolean;
      triage: boolean;
      pull: boolean;
    };
  };
  user: {
    username: string;
    name: string;
    avatar: string;
  };
};

type UserInfoResponse = {
  message: string;
  data: UserInfo;
};

export const getUserGithubInfo = async (code: string): Promise<UserInfo | null> => {
  try {
    const response = await fetch(GITHUB_USER_INFO.url, {
      method: GITHUB_USER_INFO.method,
      body: JSON.stringify({ code }),
    });

    await checkError(response);
    const data: UserInfoResponse = await response.json();
    // @ts-expect-error - authToken will be removed from the response
    const authToken = data.data.authToken;
    // @ts-expect-error - authToken will be removed from the response
    delete data.data.authToken;

    // TODO: change the cookie expiration time to appropriate value
    setCookie(AUTHORIZATION_COOKIE_NAME, authToken, 60 * 60 * 24 * 1); // 1 day in seconds
    setToLocalStorage(STORAGE_KEYS.USER_INFO, JSON.stringify(data.data));

    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

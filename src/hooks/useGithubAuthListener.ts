import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUserGithubInfo } from 'api/githubUser';
import { useGithubUserInfoStore } from 'store/GithubUserInfoStore';
import { STORAGE_KEYS } from 'constants/storage.constant';
import { getFromLocalStorage, removeFromLocalStorage } from 'utils/storage.util';
import { AUTHORIZATION_COOKIE_NAME } from 'utils/cookie.util';
import { getCookie } from 'utils/cookie.util';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';

export const useGithubAuthListener = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { setUserInfo } = useGithubUserInfoStore();
  const { setBranch } = useRepoBrowserStore();

  useEffect(() => {
    const cookie = getCookie(AUTHORIZATION_COOKIE_NAME);
    const userInfo = getFromLocalStorage(STORAGE_KEYS.USER_INFO);

    if (cookie && userInfo) {
      const userInfoData = JSON.parse(userInfo);
      setUserInfo(userInfoData);
      setBranch(userInfoData?.repo?.branch ?? null);
      return;
    } else {
      removeFromLocalStorage(STORAGE_KEYS.USER_INFO);
    }

    const allParams = Object.fromEntries(searchParams.entries());
    const { code, ...restParams } = allParams;

    if (code) {
      (async () => {
        const userInfo = await getUserGithubInfo(code);
        setUserInfo(userInfo);
        setBranch(userInfo?.repo?.branch ?? null);
      })();
    }
    setSearchParams(restParams);
  }, [searchParams, setSearchParams, setUserInfo, setBranch]);
};

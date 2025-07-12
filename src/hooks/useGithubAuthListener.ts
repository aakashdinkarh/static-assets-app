import { useEffect, useCallback } from 'react';
import { getUserGithubInfo } from 'api/githubUser';
import { useGithubUserInfoStore } from 'store/GithubUserInfoStore';
import { STORAGE_KEYS } from 'constants/storage.constant';
import { getFromLocalStorage, removeFromLocalStorage } from 'utils/storage.util';
import { AUTHORIZATION_COOKIE_NAME } from 'utils/cookie.util';
import { getCookie } from 'utils/cookie.util';
import { pollGithubCode } from 'utils/githubLogin.util';
import { useModalStore } from 'store/ModalStore';

export const useGithubAuthListener = () => {
  const { setUserInfo, setUserLoginInProgress, userLoginInProgress } = useGithubUserInfoStore();
  const { closeModal } = useModalStore();

  useEffect(() => {
    const cookie = getCookie(AUTHORIZATION_COOKIE_NAME);
    const userInfo = getFromLocalStorage(STORAGE_KEYS.USER_INFO);

    if (cookie && userInfo) {
      const userInfoData = JSON.parse(userInfo);
      setUserInfo(userInfoData);
      return;
    } else {
      removeFromLocalStorage(STORAGE_KEYS.USER_INFO);
    }
  }, [setUserInfo]);

  const fetchUserGithubInfo = useCallback(async () => {
    const githubCode = getFromLocalStorage(STORAGE_KEYS.GITHUB_CODE);
    if (!githubCode) return;

    const userInfo = await getUserGithubInfo(githubCode);
    setUserInfo(userInfo);
    removeFromLocalStorage(STORAGE_KEYS.GITHUB_CODE);
  }, [setUserInfo]);

  useEffect(() => {
    if (!userLoginInProgress) return;

    pollGithubCode().then(isSuccess => {
      if (isSuccess) {
        fetchUserGithubInfo().then(() => {
          setUserLoginInProgress(false);
          closeModal();
        });
      }
    });
  }, [userLoginInProgress, setUserLoginInProgress, fetchUserGithubInfo, closeModal]);
};

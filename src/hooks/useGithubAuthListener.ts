import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUserGithubInfo } from 'api/githubUser';
import { useGithubUserInfoStore } from 'store/GithubUserInfoStore';

export const useGithubAuthListener = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { setUserInfo } = useGithubUserInfoStore();

  useEffect(() => {
    const allParams = Object.fromEntries(searchParams.entries());
    const { code, ...restParams } = allParams;

    if (code) {
      (async () => {
        const userInfo = await getUserGithubInfo(code);
        setUserInfo(userInfo);
      })();
    }
    setSearchParams(restParams);
  }, [searchParams, setSearchParams, setUserInfo]);
};

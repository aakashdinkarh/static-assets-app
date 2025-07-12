import { GITHUB_CODE_POLLING_INTERVAL } from 'constants/github';
import { STORAGE_KEYS } from 'constants/storage.constant';
import { getFromLocalStorage } from './storage.util';
import { githubCodeCheckIntervalData } from 'constants/github';

const checkGithubCode = () => {
  const githubCode = getFromLocalStorage(STORAGE_KEYS.GITHUB_CODE);
  return !!githubCode;
};

export const pollGithubCode = () => {
  return new Promise(resolve => {
    const isGithubCodePresent = checkGithubCode();
    if (isGithubCodePresent) {
      resolve(true);
      return;
    }

    githubCodeCheckIntervalData.intervalId = setInterval(() => {
      const isGithubCodePresent = checkGithubCode();
      if (isGithubCodePresent) {
        clearInterval(githubCodeCheckIntervalData.intervalId);
        resolve(true);
      }
    }, GITHUB_CODE_POLLING_INTERVAL);
  });
};

import { create } from 'zustand';

interface GithubUserInfoStore {
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
  userLoginInProgress: boolean;
  setUserLoginInProgress: (userLoginInProgress: boolean) => void;
}

export const useGithubUserInfoStore = create<GithubUserInfoStore>(set => ({
  userInfo: null,
  setUserInfo: userInfo => set({ userInfo }),
  userLoginInProgress: false,
  setUserLoginInProgress: userLoginInProgress => set({ userLoginInProgress }),
}));

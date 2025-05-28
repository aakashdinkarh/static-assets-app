import { create } from 'zustand';

interface GithubUserInfoStore {
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
}

export const useGithubUserInfoStore = create<GithubUserInfoStore>(set => ({
  userInfo: null,
  setUserInfo: userInfo => set({ userInfo }),
}));

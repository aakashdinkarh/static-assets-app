import { create } from 'zustand';

interface LoginWithGithubModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useLoginWithGithubModalStore = create<LoginWithGithubModalStore>(set => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

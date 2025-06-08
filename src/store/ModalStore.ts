import { create } from 'zustand';

export enum ModalScreen {
  LoginWithGithub = 'LoginWithGithub',
  ConfirmationModal = 'ConfirmationModal',
}

interface ModalStore {
  modalScreen: ModalScreen | null;
  openModal: (modalScreen: ModalScreen) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>(set => ({
  modalScreen: null,
  openModal: (modalScreen: ModalScreen) => set({ modalScreen }),
  closeModal: () => set({ modalScreen: null }),
}));

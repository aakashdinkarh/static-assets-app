import { create } from 'zustand';

export enum ModalScreen {
  LoginWithGithub = 'LoginWithGithub',
  ConfirmationModal = 'ConfirmationModal',
}

interface ModalStore {
  modalScreen: ModalScreen | null;
  modalActionsDisabled: boolean;
  openModal: (modalScreen: ModalScreen) => void;
  closeModal: () => void;
  setModalActionsDisabled: (modalActionsDisabled: boolean) => void;
}

export const useModalStore = create<ModalStore>(set => ({
  modalScreen: null,
  modalActionsDisabled: false,
  openModal: (modalScreen: ModalScreen) => set({ modalScreen }),
  closeModal: () => set({ modalScreen: null }),
  setModalActionsDisabled: (modalActionsDisabled: boolean) => set({ modalActionsDisabled }),
}));

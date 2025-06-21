import { create } from 'zustand';

export enum ModalScreen {
  LoginWithGithub = 'LoginWithGithub',
  ConfirmationModal = 'ConfirmationModal',
  FilePreview = 'FilePreview',
  CommitModal = 'CommitModal',
}

interface ModalStore {
  modalScreen: ModalScreen | ModalScreen[] | null;
  modalActionsDisabled: boolean;
  openModal: (modalScreen: ModalScreen | ModalScreen[]) => void;
  closeModal: () => void;
  openScreen: (modalScreen: ModalScreen) => void;
  closeScreen: (modalScreen: ModalScreen) => void;
  setModalActionsDisabled: (modalActionsDisabled: boolean) => void;
}

export const useModalStore = create<ModalStore>(set => ({
  modalScreen: null,
  modalActionsDisabled: false,
  openModal: modalScreen => set({ modalScreen }),
  closeModal: () => set({ modalScreen: null }),
  openScreen: (modalScreen: ModalScreen) =>
    set(state => {
      let prevModalScreen = state.modalScreen || [];
      if (!Array.isArray(prevModalScreen)) {
        prevModalScreen = [prevModalScreen];
      }
      return {
        modalScreen: [...prevModalScreen, modalScreen],
      };
    }),
  closeScreen: (modalScreen: ModalScreen) =>
    set(state => {
      let prevModalScreen = state.modalScreen || [];
      if (!Array.isArray(prevModalScreen)) {
        prevModalScreen = [prevModalScreen];
      }
      return {
        modalScreen: prevModalScreen.filter(screen => screen !== modalScreen),
      };
    }),
  setModalActionsDisabled: modalActionsDisabled => set({ modalActionsDisabled }),
}));

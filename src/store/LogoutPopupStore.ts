import { create } from 'zustand';

interface LogoutPopupStore {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

export const useLogoutPopupStore = create<LogoutPopupStore>(set => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
}));

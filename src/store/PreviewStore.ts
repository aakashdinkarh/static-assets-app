import { create } from 'zustand';

interface PreviewStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  showCommitDialog: boolean;
  setShowCommitDialog: (showCommitDialog: boolean) => void;
}

export const usePreviewStore = create<PreviewStore>(set => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  isEditing: false,
  setIsEditing: (isEditing: boolean) => set({ isEditing }),
  showCommitDialog: false,
  setShowCommitDialog: (showCommitDialog: boolean) => set({ showCommitDialog }),
}));

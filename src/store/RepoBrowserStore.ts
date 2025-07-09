import type { RepoItem } from 'types/github';
import { create } from 'zustand';

interface RepoBrowserStore {
  branch: string | null;
  setBranch: (branch: string | null) => void;
  currentPath: string;
  setCurrentPath: (path: string) => void;
  listItems: RepoItem[];
  setListItems: (items: RepoItem[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useRepoBrowserStore = create<RepoBrowserStore>(set => ({
  branch: '',
  setBranch: branch => set({ branch }),
  currentPath: '/',
  setCurrentPath: path => set({ currentPath: path }),
  listItems: [],
  setListItems: items => set({ listItems: items }),
  isLoading: false,
  setIsLoading: isLoading => set({ isLoading }),
  error: null,
  setError: error => set({ error }),
}));

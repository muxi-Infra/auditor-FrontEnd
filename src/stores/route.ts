import { create } from 'zustand';

interface PageData {
  project: string;
  setProject: (name: string) => void;
}

const useRouteStore = create<PageData>()((set) => ({
  project: 'ccnubox',
  setProject: (name) => set(() => ({ project: name })),
}));

export default useRouteStore;

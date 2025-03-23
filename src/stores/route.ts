import { create } from 'zustand';

interface PageData {
  project_id: number;
  setProject: (id: number) => void;
}

const useRouteStore = create<PageData>()((set) => ({
  project_id: 0,
  setProject: (id) => set(() => ({ project_id: id })),
}));

export default useRouteStore;

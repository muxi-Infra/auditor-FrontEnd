import { Project } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectStore {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  clearProjects: () => void;
}

const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      setProjects: (projects: Project[]) => set({ projects }),
      clearProjects: () => set({ projects: [] }),
    }),
    {
      name: 'project-storage',
    }
  )
);

export default useProjectStore;

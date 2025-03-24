import { Project, ProjectDetail } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectStore {
  projects: Project[];
  projectDetail: ProjectDetail | null;
  setProjects: (projects: Project[]) => void;
  setProjectDetail: (detail: ProjectDetail) => void;
  clearProjects: () => void;
}

const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      projectDetail: null,
      setProjects: (projects: Project[]) => set({ projects }),
      setProjectDetail: (detail: ProjectDetail) =>
        set({ projectDetail: detail }),
      clearProjects: () => set({ projects: [], projectDetail: null }),
    }),
    {
      name: 'project-storage',
    }
  )
);

export default useProjectStore;

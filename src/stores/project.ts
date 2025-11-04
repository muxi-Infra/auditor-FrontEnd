import { Project } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectStore {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  clearProjects: () => void;
  removeProject: (project_id: number) => void;
}

const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      setProjects: (projects: Project[]) => set({ projects }),
      clearProjects: () => set({ projects: [] }),
      removeProject: (project_id: number) => {
        const update = get().projects.filter(
          (project) => project.id !== project_id
        );
        set({ projects: update });
      },
    }),
    {
      name: 'project-storage',
    }
  )
);

export default useProjectStore;

import { useNavigate } from 'react-router';
import { getProjectList } from '@/apis';
import useProjectStore from '@/stores/project';

export function useNavigateToProject() {
  const navigate = useNavigate();
  const { setProjects } = useProjectStore();

  return {
    toProject: async (projectId: number) => {
      try {
        const projects = await getProjectList();
        setProjects(projects);
      } catch (error) {
        console.error('Failed to fetch project data:', error);
      }
      navigate(`/${projectId}`);
    },
    toProjectSettings: (projectId: number) => {
      navigate(`/${projectId}/settings`);
    },
    toProjectItem: (projectId: number, itemId: number) => {
      navigate(`/${projectId}/${itemId}`);
    },
  };
}

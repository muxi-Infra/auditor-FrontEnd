import { useParams } from 'react-router-dom';

export function useRoute() {
  const { project: projectId, item: itemId } = useParams<{
    project: string;
    item: string;
  }>();

  return {
    projectId: projectId ? parseInt(projectId) : undefined,
    itemId: itemId ? parseInt(itemId) : undefined,
  };
}

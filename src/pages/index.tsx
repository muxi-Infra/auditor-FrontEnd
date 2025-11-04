import { getMyInfo, getProjectList } from '@/apis';
import { useNavigateToProject } from '@/hooks/navigate';
import useProjectStore from '@/stores/project';
import { useEffect, useState } from 'react';
import useUserStore from '@/stores/user';
export default function Page() {
  const { setProjects } = useProjectStore();
  const [isChecking, setIsChecking] = useState(true);
  const { toProject } = useNavigateToProject();
  const { updateUser, user } = useUserStore();
  useEffect(() => {
    getMyInfo()
      .then((res) => {
        console.log(res);
        updateUser({
          ...res,
        });
        console.log(user);
      })
      .then(() => {
        getProjectList().then((projectList) => {
          setProjects(projectList);
          setIsChecking(false);
          if (projectList.length > 0) {
            toProject(projectList[0].id);
          }
        });
      })
      .catch(() => {
        const landing = `${window.location.host}/login`;
        window.location.href = `http://pass.muxi-tech.xyz/#/login_auth?landing=${landing}&client_id=dc0c99b7-4e9e-4e61-8344-258141fd673d`;
      });
  }, []);

  if (isChecking) {
    return <div>Checking authentication...</div>;
  }

  return <div>Navigating...</div>;
}

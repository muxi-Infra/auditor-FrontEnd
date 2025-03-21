import { getProjectList } from '@/apis';
import useProjectStore from '@/stores/project';
import useUserStore from '@/stores/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const { isLoggedIn } = useUserStore();
  const { setProjects } = useProjectStore();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      const landing = `${window.location.host}/login`;
      window.location.href = `http://pass.muxi-tech.xyz/#/login_auth?landing=${landing}&client_id=dc0c99b7-4e9e-4e61-8344-258141fd673d`;
    } else {
      getProjectList().then((projectList) => {
        setProjects(projectList);
        setIsChecking(false);
        if (projectList.length > 0) {
          navigate(projectList[0].project_id.toString());
        }
      });
    }
  }, [isLoggedIn]);

  if (isChecking) {
    return <div>Checking authentication...</div>;
  }

  return <div>Navigating...</div>;
}

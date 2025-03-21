import { getProjectList } from '@/apis';
import useUserStore from '@/stores/user';
import { useEffect, useState } from 'react';

export default function Page() {
  const { isLoggedIn } = useUserStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      const landing = `${window.location.host}/login`;
      window.location.href = `http://pass.muxi-tech.xyz/#/login_auth?landing=${landing}&client_id=dc0c99b7-4e9e-4e61-8344-258141fd673d`;
    } else {
      setIsChecking(false);
      getProjectList();
    }
  }, [isLoggedIn]);

  if (isChecking) {
    return <div>Checking authentication...</div>;
  }

  return <div>Main Content</div>;
}

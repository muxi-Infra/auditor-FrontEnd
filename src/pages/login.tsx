import { getMyInfo, login } from '@/apis';
import useUserStore from '@/stores/user';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser, setToken  } = useUserStore();

  useEffect(() => {
    const handleLogin = async () => {
      const code = params.get('accessCode');
      console.log(code);

      if (!code) return;

      setIsLoading(true);
      setError(undefined);

      try {
        const token = await login(code);
        if (token === '') return;
        console.log(token);
        setToken(token);

        const userInfo = await getMyInfo();
        updateUser({ ...userInfo });
        
        navigate('/');
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error during login or fetching user info:', err);
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleLogin();
  }, [params, navigate, setToken, updateUser]);

  if (isLoading) {
    return <div>Logging in...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>权限待审核</div>;
}

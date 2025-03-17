import { getMyInfo, login } from '@/apis';
import useUserStore from '@/store/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser, setToken, setLoggedIn } = useUserStore();

  useEffect(() => {
    const code = params.get('accessCode');
    console.log(code);
    if (code) {
      setIsLoading(true);
      setError(undefined);
      login(code)
        .then((token) => {
          console.log(token);
          setToken(token);
          setLoggedIn(true);
          return getMyInfo()
            .then((userInfo) => {
              updateUser({ ...userInfo });
              navigate('/');
            })
            .catch((infoError) => {
              console.error('Failed to fetch user info:', infoError);
              setError(
                infoError instanceof Error
                  ? infoError.message
                  : 'Failed to fetch user info'
              );
            });
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : 'Login failed');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <div>Logging in...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Login</div>;
}

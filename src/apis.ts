import useUserStore from './store/useUserStore';
import { User } from './types';
import { getWithAuth, post } from './utils/request';

async function login(code: string) {
  const token = await post<string>('/api/v1/user/login', {
    body: {
      code: code,
    },
  });
  return token;
}

async function getMyInfo() {
  const token = useUserStore.getState().getToken();
  const info = await getWithAuth<User>('/api/v1/user/getMyInfo', token);
  console.log(info);
  return info;
}

export { login, getMyInfo };

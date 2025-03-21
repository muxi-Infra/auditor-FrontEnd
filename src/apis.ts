import { User } from './types';
import { getWithAuth, post } from './utils/request';

async function login(code: string) {
  const token = await post<string>('/api/v1/auth/login', {
    body: {
      code: code,
    },
  });
  return token;
}

async function getMyInfo() {
  const info = await getWithAuth<User>('/api/v1/user/getMyInfo');
  console.log(info);
  return info;
}

async function getProjectList() {
  const projects = await getWithAuth<
    [
      {
        project_id: number;
        project_name: string;
      },
    ]
  >('/api/v1/project/getProjectList');
  console.log(projects);
  return projects;
}

export { login, getMyInfo, getProjectList };

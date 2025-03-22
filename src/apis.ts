import { Project, User } from './types';
import { getWithAuth, post } from './utils/request';

async function login(code: string) {
  return post<string>('/api/v1/auth/login', {
    body: {
      code: code,
    },
  });
}

async function getMyInfo() {
  return getWithAuth<User>('/api/v1/user/getMyInfo');
}

async function updateMyInfo() {}

async function getProjectList() {
  return getWithAuth<Project[]>('/api/v1/project/getProjectList');
}

async function getQiniuToken() {
  return getWithAuth<string>('/api/v1/tube/GetQiToken');
}

export { login, getMyInfo, updateMyInfo, getProjectList, getQiniuToken };

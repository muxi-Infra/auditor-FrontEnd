import { Item, Project, User } from './types';
import { getWithAuth, post, postWithAuth } from './utils/request';

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

async function getProjectItems(project_id: number) {
  return postWithAuth<Item[]>('/api/v1/item/select', {
    body: {
      project_id: project_id,
    },
  });
}

async function getQiniuToken() {
  return getWithAuth<string>('/api/v1/tube/GetQiToken');
}

export {
  login,
  getMyInfo,
  updateMyInfo,
  getProjectList,
  getProjectItems,
  getQiniuToken,
};

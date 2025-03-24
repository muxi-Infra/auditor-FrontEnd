import { Item, Project, ProjectDetail, User } from './types';
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

async function getProjectDetail(project_id: number) {
  return getWithAuth<ProjectDetail>(`/api/v1/project/${project_id}/detail`);
}

async function getProjectItems(project_id: number) {
  return postWithAuth<Item[]>('/api/v1/item/select', {
    body: {
      project_id: project_id,
    },
  });
}

async function getItemDetail(item_id: number) {
  return getWithAuth<Item>(`/api/v1/item/${item_id}/detail`);
}

async function auditItem(item_id: number, reason: string, status: 0 | 1 | 2) {
  return postWithAuth<null>(`/api/v1/item/${item_id}/audit`, {
    body: {
      item_id: item_id,
      reason: reason,
      status: status,
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
  getProjectDetail,
  getProjectItems,
  getItemDetail,
  auditItem,
  getQiniuToken,
};

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

async function createProject(
  name: string,
  logo: string,
  rule: string,
  members: number[]
) {
  return postWithAuth<number>('/api/v1/project/create', {
    body: {
      name: name,
      logo: logo,
      audit_rule: rule,
      user_ids: members,
    },
  });
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
  return postWithAuth<null>(`/api/v1/item/audit`, {
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

async function uploadImage(image: File) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('token', await getQiniuToken());
  const res = await fetch('https://up-z2.qiniup.com', {
    method: 'POST',
    body: formData, // Let browser set the Content-Type header automatically
  });
  if (!res.ok) {
    throw new Error('Failed to upload image');
  }
  return 'https://mini-project.muxixyz.com/' + (await res.json()).key;
}

export {
  login,
  getMyInfo,
  updateMyInfo,
  getProjectList,
  createProject,
  getProjectDetail,
  getProjectItems,
  getItemDetail,
  auditItem,
  getQiniuToken,
  uploadImage,
};

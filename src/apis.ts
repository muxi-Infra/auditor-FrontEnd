
import {
  Item,
  Project,
  ProjectDetail,
  User,
  SearchBody,
  FilterBody,
  itemToAudit,
  Member,
  UpdateProject,
  ProjectRole,
  AiAuditItem,
} from './types';
import {
  getWithAuth,
  post,
  postWithAuth,
  delWithAuth,
  putWithAuth,
} from './utils/request';

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
async function getProjectItemsBySearch(
  search: SearchBody,
  project_id?: number
) {
  return postWithAuth<Item[]>('/api/v1/item/select', {
    body: {
      ...(project_id ? { project_id } : {}),
      query: search.query,
    },
  });
}
async function getProjectItemsByPagination(
  project_id: number,
  page: number,
  page_size: number
) {
  return postWithAuth<Item[]>('/api/v1/item/select', {
    body: {
      project_id: project_id,
      page: page,
      page_size: page_size,
    },
  });
}
async function getItemsAmount(project_id: number) {
  return getWithAuth<number>(`/api/v1/project/${project_id}/getItemNums`);
}
async function getProjectItemsByFilter(
  filter: FilterBody & { project_id: number }
) {
  return postWithAuth<Item[]>('/api/v1/item/select', {
    body: {
      project_id: filter.project_id,
      statuses: filter.statuses,
      round_time: filter.round_time,
      tags: filter.tags,
      auditors: filter.auditors,
    },
  });
}
async function getItemDetail(item_id: number) {
  return getWithAuth<Item>(`/api/v1/item/${item_id}/detail`);
}

async function auditItem(item_id: number, status: 0 | 1 | 2, reason?: string) {
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

async function getAllTags(project_id: number) {
  return await getWithAuth<string[]>(`api/v1/project/${project_id}/getAllTags`);
}

async function auditMany(itemsToAudit: itemToAudit[]) {
  return await postWithAuth<string>('api/v1/item/auditMany', {
    body: {
      reqs: itemsToAudit,
    },
  });
}

async function getAllMembers(project_id: number) {
  return await getWithAuth<Member[]>(`/api/v1/project/${project_id}/getUsers`);
}
async function deleteProject(project_id: number) {
  return await delWithAuth<null>(`/api/v1/project/${project_id}/delete`);
}

async function updateProject(project_id: number, update: UpdateProject) {
  return await postWithAuth<null>(`/api/v1/project/${project_id}/update`, {
    body: {
      audio_rule: update.audit_rule,
      description: update.description,
      logo: update.logo,
      project_name: update.project_name,
    },
  });
}

async function giveProjectRole(updateMember: ProjectRole[], api_key: string) {
  return await putWithAuth<ProjectRole[]>(
    `/api/v1/project/giveProjectRole`,
    {
      body: {
        add_users: updateMember,
      },
    },
    api_key
  );
}

async function deleteUsers(delete_users: number[], api_key: string) {
  return await delWithAuth<number[]>(
    `/api/v1/project/deleteUsers`,
    {
      body: {
        ids: delete_users,
      },
    },
    api_key
  );
}
async function updateMyInfo(avatar: string, name: string | undefined) {
  return await postWithAuth<null>('/api/v1/user/updateMyInfo', {
    body: {
      avatar,
      name,
    },
  });
}

async function addUsers(members: ProjectRole[], api_key: string) {
  return await postWithAuth<null>(
    '/api/v1/project/addUsers',
    {
      body: {
        add_users: members,
      },
    },
    api_key
  );
}
async function getAllUsers(
  the_query: string = '',
  page: number = 1,
  pageSize: number = 30
) {
  return await getWithAuth<User[]>(
    `/api/v1/user/getUsers?the_query=${the_query}&page=${page}&pageSize=${pageSize}`
  );
}

async function selectUser(the_query: string, api_key: string) {
  return await getWithAuth<User[]>(
    `/api/v1/project/selectUser?the_query=${the_query}`,
    api_key
  );
}

async function getProjectRole(project_id: number) {
  return await getWithAuth<number>(`/api/v1/user/getProjectRole/${project_id}`);
}

async function logout() {
  return await getWithAuth<null>('/api/v1/auth/logout');
}

async function aiAudit(items: AiAuditItem[]) {
  return postWithAuth<null>('/api/v1/llm/audit', {
    body: {
      data: items,
    },
  });
}
export {
  getItemsAmount,
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
  getProjectItemsBySearch,
  getAllTags,
  getProjectItemsByFilter,
  auditMany,
  getAllMembers,
  deleteProject,
  updateProject,
  giveProjectRole,
  deleteUsers,
  getAllUsers,
  addUsers,
  selectUser,
  getProjectRole,
  logout,
  aiAudit,
  getProjectItemsByPagination,
};

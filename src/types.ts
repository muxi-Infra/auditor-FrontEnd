export interface User {
  avatar?: string | undefined;
  email?: string;
  name?: string | undefined;
  role?: number;
  id?: number | undefined;
}

export interface Member {
  name: string;
  id: number;
  avatar?: string;
  project_role: number;
  role: number;
  email: string;
}

export interface Project {
  id: number;
  name: string;
}

export interface ProjectDetail {
  project_name: string;
  description: string;
  total_number: number;
  current_number: number;
  api_key: string;
  audit_rule: string;
}

export interface Item {
  id: number;
  author: string;
  tags: string[];
  status: number;
  public_time: number;
  auditor: number;
  content: {
    topic: { title: string } & Comment;
    last_comment: Comment;
    next_comment: Comment;
  };
}

export interface Comment {
  content: string;
  pictures: string[];
}

export interface SearchBody {
  project_id?: number;
  query: string;
}

export interface FilterBody {
  tags: string[];
  auditors: string[];
  round_time: [number, number][];
  statuses: number[];
}

export interface itemToAudit {
  item_id: number;
  status: number;
}

export interface UpdateProject {
  audit_rule: string;
  description: string;
  logo: string;
  project_name: string;
}

export interface ProjectRole {
  project_role: number;
  user_id: number;
}

export type AiAuditItem = Item & { projectID: number };

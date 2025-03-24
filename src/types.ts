export interface User {
  avatar?: string;
  email?: string;
  name?: string;
  role?: number;
}

export interface Project {
  id: number;
  name: string;
}

export interface ProjectDetail {
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
  content: ItemContent;
}

export interface ItemContent {
  topic: { title: string } & Comment;
  last_comment: Comment;
  next_comment: Comment;
}

export interface Comment {
  content: string;
  pictures: string[];
}

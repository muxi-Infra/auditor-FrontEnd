export interface Project {
  id: number;
  name: string;
}

export interface User {
  avatar?: string;
  email?: string;
  name?: string;
  role?: number;
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

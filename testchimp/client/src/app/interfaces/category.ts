import { User } from './user';

export interface Category {
  _id?: string;
  title: string;
  shortDescription: string;
  description: string;
  skills: string[];
  level: string;
  type: string;
  time?: number;
  relevantRoles: string;
  createdBy?: User;
  createdAt?: string;
}

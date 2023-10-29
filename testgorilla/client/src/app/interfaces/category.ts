import { User } from './user';

export interface Category {
  _id?: string;
  title: string;
  shortDescription: string;
  description: string;
  skills: string[];
  level: string;
  type: string;
  duration?: number;
  relevantRoles: string;
  createdBy?: User;
  createdAt?: string;
}

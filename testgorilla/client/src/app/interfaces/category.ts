import { User } from './user';

export interface Category {
  _id?: string;
  title: string;
  shortDescription: string;
  description: string;
  skills: string[];
  relevantRoles: string[];
  createdBy?: User;
  createdAt?: string;
}

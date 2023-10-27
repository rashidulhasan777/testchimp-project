import { Candidate } from './candidate';
import { Category } from './category';
import { User } from './user';

export interface Assessment {
  _id: string;
  title: string;
  jobRole: string;
  createdBy: User;
  deadline: string;
  categories: Category[];
  candidates: Candidate[];
  createdAt: string;
  updatedAt: string;
}

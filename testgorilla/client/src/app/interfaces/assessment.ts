import { Candidate } from './candidate';
import { Category } from './category';
import { Question } from './question';
import { User } from './user';

export interface Assessment {
  _id?: string;
  title: string;
  jobRole: string;
  createdBy?: User;
  deadline?: string;
  questions: Question[] | string[];
  categories: Category[] | string[];
  candidates?: Candidate[];
  createdAt?: string;
  updatedAt?: string;
}

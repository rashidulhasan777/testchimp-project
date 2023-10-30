import { Candidate } from './candidate';
import { Question } from './question';
import { User } from './user';

export interface Assessment {
  _id?: string;
  title: string;
  jobRole: string;
  createdBy?: User;
  deadline?: string;
  questions: Question[] | string[];
  candidates?: Candidate[];
  createdAt?: string;
  updatedAt?: string;
}

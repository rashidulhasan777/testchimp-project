import { Assessment } from './assessment';
import { Question } from './question';
import { User } from './user';

export interface TestResult {
  question: Question;
  answer: string;
}

export interface Candidate {
  name: string;
  email: string;
  phoneNumber: string;
  submittedTestResults: TestResult[];
  assignedBy: User;
  createdAt: string;
  assessment: Assessment;
}

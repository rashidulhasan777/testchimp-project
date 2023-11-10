export interface TestResult {
  question: string;
  correctAnswer: string;
  givenAnswer: string;
}

export interface Candidate {
  _id?: string;
  name: string;
  email: string;
  images: string[];
  browser: string;
  device: string;
  location: string;
  ipAddress: string;
  assignedBy: string;
  assessment: string | any[];
  mouseLeft: boolean;
  score: number;
  submittedTestResults: TestResult[];
  createdAt?: string;
}

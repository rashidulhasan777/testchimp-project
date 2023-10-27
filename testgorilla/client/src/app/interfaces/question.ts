import { Category } from './category';
import { User } from './user';

enum Level {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export interface Question {
  _id: string;
  title: string;
  options: string[];
  answer: string;
  duration: number;
  level: Level;
  category: Category[];
  createdBy: User;
  createdAt: string;
}

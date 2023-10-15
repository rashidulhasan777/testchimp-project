import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  companyLogo: { type: String },
  companyName: { type: String },
  country: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  role: {
    type: String,
    enum: ['SUPER_ADMIN', 'ADMIN', 'RECRUITER', 'HIRING_MANAGER'],
    default: 'ADMIN',
  },
  tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  assessments: [{ type: Schema.Types.ObjectId, ref: 'Assessment' }],
  candidates: [{ type: Schema.Types.ObjectId, ref: 'Candidate' }],
});

const User = model('User', userSchema);

const TestSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String },
  level: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
    required: true,
  },
  skills: [{ type: String, required: true }],
  relevantRoles: [{ type: String, required: true }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  createdAt: { type: Date, required: true, default: Date.now },
});

const Test = model('Test', TestSchema);

const QuestionSchema = new Schema({
  title: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
  duration: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Question = model('Question', QuestionSchema);

const AssessmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  candidates: [{ type: Schema.Types.ObjectId, ref: 'Candidate' }],
  createdAt: { type: Date, required: true, default: Date.now },
});

const Assessment = model('Assessment', AssessmentSchema);

const TestResultSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  answer: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const CandidateSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  submittedTestResults: [{ type: TestResultSchema }],
  createdAt: { type: Date, required: true, default: Date.now },
  assessments: [{ type: Schema.Types.ObjectId, ref: 'Assessment' }],
});

const Candidate = model('Candidate', CandidateSchema);

export { Assessment, Candidate, Question, Test, User };

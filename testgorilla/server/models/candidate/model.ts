import { Schema, model } from 'mongoose';

const TestResultSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  correctAnswer: { type: String, required: true },
  givenAnswer: { type: String, required: true },
});

const CandidateSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  images: [{ type: String }],
  browser: { type: String },
  device: { type: String },
  location: { type: String },
  ipAddress: { type: String },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  assessment: { type: Schema.Types.ObjectId, ref: 'Assessment' },
  submittedTestResults: [{ type: TestResultSchema }],
  score: { type: Number },
  mouseLeft: { type: Boolean },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Candidate = model('Candidate', CandidateSchema);

export default Candidate;

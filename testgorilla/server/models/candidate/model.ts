import { Schema, model } from 'mongoose';

const TestResultSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  answer: { type: String, required: true },
});

const CandidateSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  submittedTestResults: [{ type: TestResultSchema }],
  assignedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, required: true, default: Date.now },
  assessments: [{ type: Schema.Types.ObjectId, ref: 'Assessment' }],
});

const Candidate = model('Candidate', CandidateSchema);

export default Candidate;

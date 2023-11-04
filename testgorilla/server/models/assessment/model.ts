import { Schema, model } from 'mongoose';

const AssessmentSchema = new Schema({
  title: { type: String, required: true },
  jobRole: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  candidates: [{ type: Schema.Types.ObjectId, ref: 'Candidate' }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  deadline: { type: Date },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const Assessment = model('Assessment', AssessmentSchema);

export default Assessment;

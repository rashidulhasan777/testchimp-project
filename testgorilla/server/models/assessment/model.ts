import { Schema, model } from 'mongoose';

const AssessmentSchema = new Schema({
  title: { type: String, required: true },
  jobRole: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  candidates: [{ type: Schema.Types.ObjectId, ref: 'Candidate' }],
  deadline: { type: Date },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const Assessment = model('Assessment', AssessmentSchema);

export default Assessment;

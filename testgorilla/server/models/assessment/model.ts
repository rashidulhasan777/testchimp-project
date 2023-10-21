import { Schema, model } from 'mongoose';

const AssessmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  candidates: [{ type: Schema.Types.ObjectId, ref: 'Candidate' }],
  createdAt: { type: Date, required: true, default: Date.now },
});

const Assessment = model('Assessment', AssessmentSchema);

export default Assessment;

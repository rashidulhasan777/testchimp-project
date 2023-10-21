import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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

export default User;

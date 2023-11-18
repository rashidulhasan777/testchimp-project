import { Schema, model } from 'mongoose';

const QuestionSchema = new Schema({
  title: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
  duration: { type: Number, required: true },
  level: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
    required: true,
  },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Question = model('Question', QuestionSchema);

export default Question;

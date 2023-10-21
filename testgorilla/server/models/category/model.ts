import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String },
  skills: [{ type: String, required: true }],
  relevantRoles: [{ type: String, required: true }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Category = model('Categorie', CategorySchema);

export default Category;

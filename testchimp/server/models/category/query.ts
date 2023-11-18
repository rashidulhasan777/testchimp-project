import Question from '../question/model';
import Category from './model';

const getAllCategories = async () => {
  const categories = await Category.find();
  return categories;
};

const getCategoryById = async (id: string) => {
  const category = await Category.findById(id);
  return category;
};

const getQuestionByCategoryId = async (categoryId: string) => {
  const questions = await Question.find({ category: categoryId });
  return questions;
};

type CategoryType = {
  title: string;
  shortDescription: string;
  description: string;
  level: string;
  type: string;
  skills: string[];
  relevantRoles: string;
  createdBy?: string;
};

const createCategory = async (categoryObject: CategoryType) => {
  const category = await Category.create({ ...categoryObject });
  return category;
};

const updateCategoryById = async (
  categoryId: string,
  categoryObject: CategoryType,
) => {
  const category = await Category.findByIdAndUpdate(
    { _id: categoryId },
    {
      ...categoryObject,
    },
    { new: true },
  );
  return category;
};

const deleteCategoryById = async (id: string) => {
  const category = await Category.findByIdAndDelete(id);
  return category;
};

export {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  getQuestionByCategoryId,
};

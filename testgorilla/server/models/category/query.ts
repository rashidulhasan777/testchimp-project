import Category from './model';

const getAllCategories = async () => {
  const categories = await Category.find();
  return categories;
};

const getCategoryById = async (id: string) => {
  const category = await Category.findById(id);
  return category;
};

const createCategory = async (
  createdBy: string,
  title: string,
  shortDescription: string,
  description: string,
  level: string,
  skills: string[],
  relevantRoles: string[],
) => {
  const category = await Category.create({
    title,
    shortDescription,
    description,
    level,
    skills,
    relevantRoles,
    createdBy,
  });
  return category;
};

const updateCategoryById = async (
  id: string,
  title: string,
  shortDescription: string,
  description: string,
  skills: string[],
  relevantRoles: string[],
) => {
  const category = await Category.findByIdAndUpdate(
    { _id: id },
    {
      title,
      shortDescription,
      description,
      skills,
      relevantRoles,
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
};

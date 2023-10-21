import Assessment from './model';

const getAllAssessments = async () => {
  const assessment = await Assessment.find();
  return assessment;
};

const getAssessmentById = async (id: string) => {
  const assessment = await Assessment.findById(id);
  return assessment;
};

const createAssessment = async (
  title: string,
  description: string,
  categories: string[],
  candidates: string[],
  createdBy: string,
) => {
  const assessment = await Assessment.create({
    title,
    description,
    categories,
    candidates,
    createdBy,
  });
  return assessment;
};

const updateAssessmentById = async (
  id: string,
  title: string,
  description: string,
  categories: string[],
  candidates: string[],
) => {
  const assessment = await Assessment.findByIdAndUpdate(
    { _id: id },
    {
      title,
      description,
      categories,
      candidates,
    },
    { new: true },
  );
  return assessment;
};

const deleteAssessmentById = async (id: string) => {
  const assessment = await Assessment.findByIdAndDelete(id);
  return assessment;
};

export {
  createAssessment,
  deleteAssessmentById,
  getAllAssessments,
  getAssessmentById,
  updateAssessmentById,
};

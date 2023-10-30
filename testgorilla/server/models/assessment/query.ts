import Assessment from './model';

type AssessmentType = {
  title: string;
  jobRole: string;
  questions: string[];
  candidates: string[];
  createdBy: string;
};

const getAllAssessments = async () => {
  const assessment = await Assessment.aggregate([
    {
      $lookup: {
        from: 'questions',
        localField: 'questions',
        foreignField: '_id',
        as: 'questions',
      },
    },
    {
      $lookup: {
        from: 'candidates',
        localField: 'candidates',
        foreignField: '_id',
        as: 'candidates',
      },
    },
  ]);
  return assessment;
};

const getAssessmentById = async (id: string) => {
  const assessment = await Assessment.findById(id);
  return assessment;
};

const createAssessment = async (assessmentObject: AssessmentType) => {
  const assessment = await Assessment.create({ ...assessmentObject });
  return assessment;
};

const updateAssessmentById = async (
  assessmentId: string,
  assessmentObject: AssessmentType,
) => {
  const assessment = await Assessment.findByIdAndUpdate(
    { _id: assessmentId },
    {
      ...assessmentObject,
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

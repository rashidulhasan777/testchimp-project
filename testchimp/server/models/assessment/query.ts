import mongoose from 'mongoose';
import Assessment from './model';

type AssessmentType = {
  title: string;
  jobRole: string;
  questions: string[];
  categories: string[];
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
  // const assessment = await Assessment.findById(id);
  const assessment = await Assessment.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
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
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
  ]);
  return assessment[0];
};

// const getAssessmentByCreatedBy = async (createdBy: string) => {
//   const assessment = await Assessment.find({ createdBy }).sort({
//     createdAt: -1,
//   });
//   // const assessment = await Assessment.aggregate([
//   //   {
//   //     $match: { createdBy: new mongoose.Types.ObjectId(createdBy) },
//   //   },
//   //   {
//   //     $lookup: {
//   //       from: 'questions',
//   //       localField: 'questions',
//   //       foreignField: '_id',
//   //       as: 'questions',
//   //     },
//   //   },
//   //   {
//   //     $lookup: {
//   //       from: 'candidates',
//   //       localField: 'candidates',
//   //       foreignField: '_id',
//   //       as: 'candidates',
//   //     },
//   //   },
//   //   {
//   //     $lookup: {
//   //       from: 'categories',
//   //       localField: 'categories',
//   //       foreignField: '_id',
//   //       as: 'categories',
//   //     },
//   //   },
//   // ]);
//   return assessment;
// };

const getAssessmentByCreatedBy = async (createdBy: string) => {
  const assessment = await Assessment.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(createdBy) },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        candidates: { $size: '$candidates' },
        createdAt: 1,
        updatedAt: 1,
        deadline: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
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
  getAssessmentByCreatedBy,
  getAssessmentById,
  updateAssessmentById,
};

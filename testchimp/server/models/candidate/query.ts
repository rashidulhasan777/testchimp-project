import mongoose from 'mongoose';
import Assessment from '../assessment/model';
import Candidate from './model';

export interface TestResult {
  question: string;
  correctAnswer: string;
  givenAnswer: string;
}

export interface Candidate {
  name: string;
  email: string;
  images: string[];
  browser: string;
  device: string;
  location: string;
  ipAddress: string;
  assignedBy: string;
  assessment: string;
  submittedTestResults: TestResult[];
  createdAt?: string;
}

const getAllCandidates = async () => {
  const candidates = await Candidate.find();
  return candidates;
};

const getCandidateById = async (id: string) => {
  // const candidate = await Candidate.findById(id);
  const candidate = await Candidate.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'assessments',
        localField: 'assessment',
        foreignField: '_id',
        as: 'assessment',
      },
    },
  ]);
  return candidate[0];
};

// const getCandidateByAssessmentId = async (assessmentId: string) => {
//   const candidate = await Candidate.find({ assessment: assessmentId }).sort({
//     createdAt: -1,
//   });
//   return candidate;
// };

const getCandidateByAssessmentId = async (assessmentId: string) => {
  const candidate = await Candidate.aggregate([
    {
      $match: {
        assessment: new mongoose.Types.ObjectId(assessmentId),
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        createdAt: 1,
        score: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  return candidate;
};

// const getCandidateByAssignedById = async (assignedById: string) => {
//   const candidate = await Candidate.find({ assignedBy: assignedById }).sort({
//     createdAt: -1,
//   });
//   return candidate;
// };

const getCandidateByAssignedById = async (assignedById: string) => {
  const candidate = await Candidate.aggregate([
    {
      $match: {
        assignedBy: new mongoose.Types.ObjectId(assignedById),
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        createdAt: 1,
        score: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  return candidate;
};

const createCandidate = async (candidateObj: Candidate) => {
  const candidate = await Candidate.create({ ...candidateObj });
  await Assessment.findByIdAndUpdate(
    { _id: candidateObj.assessment },
    { $push: { candidates: candidate._id }, updatedAt: new Date() },
  );
  return candidate;
};

const updateCandidateById = async (
  id: string,
  name: string,
  email: string,
  phoneNumber: string,
  assignedBy: string,
) => {
  const candidate = await Candidate.findByIdAndUpdate(
    { _id: id },
    {
      name,
      email,
      phoneNumber,
      assignedBy,
    },
    { new: true },
  );
  return candidate;
};

const deleteCandidateById = async (id: string) => {
  const candidate = await Candidate.findByIdAndDelete(id);
  return candidate;
};

export {
  createCandidate,
  deleteCandidateById,
  getAllCandidates,
  getCandidateByAssessmentId,
  getCandidateByAssignedById,
  getCandidateById,
  updateCandidateById,
};

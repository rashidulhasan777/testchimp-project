import Candidate from './model';

const getAllCandidates = async () => {
  const candidates = await Candidate.find();
  return candidates;
};

const getCandidateById = async (id: string) => {
  const candidate = await Candidate.findById(id);
  return candidate;
};

const createCandidate = async (
  name: string,
  email: string,
  phoneNumber: string,
  assignedBy: string,
) => {
  const candidate = await Candidate.create({
    name,
    email,
    phoneNumber,
    assignedBy,
  });
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
  getCandidateById,
  updateCandidateById,
};

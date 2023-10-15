import { Test } from '../models';

const getAllTests = async () => {
  const tests = await Test.find();
  return tests;
};

const getTestById = async (id: string) => {
  const test = await Test.findById(id);
  return test;
};

const createTest = async (
  creator: string,
  title: string,
  shortDescription: string,
  description: string,
  level: string,
  skills: string[],
  relevantRoles: string[],
) => {
  const test = await Test.create({
    title,
    shortDescription,
    description,
    level,
    skills,
    relevantRoles,
    creator,
  });
  return test;
};

const updateTestById = async (
  id: string,
  title: string,
  shortDescription: string,
  description: string,
  level: string,
  skills: string[],
  relevantRoles: string[],
) => {
  const test = await Test.findByIdAndUpdate(
    { _id: id },
    {
      title,
      shortDescription,
      description,
      level,
      skills,
      relevantRoles,
    },
    { new: true },
  );
  return test;
};

const deleteTestById = async (id: string) => {
  const test = await Test.findByIdAndDelete(id);
  return test;
};

export { createTest, deleteTestById, getAllTests, getTestById, updateTestById };

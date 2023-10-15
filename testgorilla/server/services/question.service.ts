import { Question } from '../models';

const createQuestion = async (
  title: string,
  options: string[],
  answer: string,
  duration: number,
) => {
  const question = await Question.create({
    title,
    options,
    answer,
    duration,
  });
  return question;
};
// const createQuestion = async (
//   title: string,
//   options: string[],
//   answer: string,
//   duration: number,
// ) => {
//   const question = await prisma.question.create({
//     data: {
//       title,
//       options,
//       answer,
//       duration,
//     },
//   });
//   return question;
// };

const getQuestionById = async (id: string) => {
  const question = await Question.findById(id);
  return question;
};
// const getQuestionById = async (id: string) => {
//   const question = await prisma.question.findUnique({
//     where: {
//       id,
//     },
//   });
//   return question;
// };

const updateQuestionById = async (
  id: string,
  title: string,
  options: string[],
  answer: string,
  duration: number,
) => {
  const question = await Question.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      title,
      options,
      answer,
      duration,
    },
    {
      new: true,
    },
  );
  return question;
};
// const updateQuestionById = async (
//   id: string,
//   title: string,
//   options: string[],
//   answer: string,
//   duration: number,
// ) => {
//   const question = await prisma.question.update({
//     where: {
//       id: id,
//     },
//     data: {
//       title,
//       options,
//       answer,
//       duration,
//     },
//   });
//   return question;
// };

const deleteQuestionById = async (id: string) => {
  const question = await Question.findByIdAndDelete(id);
  return question;
};
// const deleteQuestionById = async (id: string) => {
//   const question = await prisma.question.delete({
//     where: {
//       id,
//     },
//   });
//   return question;
// };

const getAllQuestions = async () => {
  const questions = await Question.find();
  return questions;
};
// const getAllQuestions = async () => {
//   const questions = await prisma.question.findMany();
//   return questions;
// };

export {
  createQuestion,
  deleteQuestionById,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
};

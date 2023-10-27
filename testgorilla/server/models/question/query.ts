import mongoose from 'mongoose';
import Question from './model';

const createQuestion = async (
  createdBy: string,
  title: string,
  options: string[],
  answer: string,
  duration: number,
  level: string,
  category: string,
) => {
  const question = await Question.create({
    createdBy,
    title,
    options,
    answer,
    duration,
    level,
    category,
  });
  return question;
};

const getQuestionById = async (id: string) => {
  // const question = await Question.findById(id);
  const question = await Question.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
  ]);
  return question[0] || null;
};

const updateQuestionById = async (
  id: string,
  title: string,
  options: string[],
  answer: string,
  duration: number,
  level: string,
  category: string,
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
      level,
      category,
    },
    {
      new: true,
    },
  );
  return question;
};

const deleteQuestionById = async (id: string) => {
  const question = await Question.findByIdAndDelete(id);
  return question;
};

const getAllQuestions = async () => {
  // const questions = await Question.find();
  const questions = await Question.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
  ]);
  // write a query to get data from question with category
  // const questions = await Question.find().populate('category');
  return questions;
};

export {
  createQuestion,
  deleteQuestionById,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
};

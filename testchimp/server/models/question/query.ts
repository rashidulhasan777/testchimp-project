import mongoose from 'mongoose';
import Question from './model';
import Category from '../category/model';

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
  await Category.findByIdAndUpdate(
    {
      _id: category,
    },
    {
      $inc: {
        time: duration,
      },
    },
  );
  // console.log(updatedTest);
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

const getAllQuestions = async (skip: number, limit: number) => {
  // const questions = await Question.find();
  const total = await Question.countDocuments();
  if (skip > total) throw new Error('Skip is greater than total');
  const questions = await Question.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);
  const responseObject = {
    status: 'success',
    length: questions.length,
    total: total,
    data: questions,
  };
  // write a query to get data from question with category
  // const questions = await Question.find().populate('category');
  return responseObject;
};

const getQuestionByCategory = async (categoryIds: (string | undefined)[]) => {
  const questions = await Question.find(
    {
      category: {
        $in: categoryIds,
      },
    },
    {
      _id: 1,
    },
  );
  return questions.map((question) => question._id);
};

export {
  createQuestion,
  deleteQuestionById,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  getQuestionByCategory,
};

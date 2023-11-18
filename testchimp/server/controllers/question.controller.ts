import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/protect.middleware';
import {
  createQuestion,
  deleteQuestionById,
  getAllQuestions,
  getQuestionByCategory,
  getQuestionById,
  updateQuestionById,
} from '../models/question/query';

const getQuestionsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt((req.query.page as string) || '1');
    const skip = (page - 1) * 10;
    const limit = parseInt((req.query.limit as string) || '10');
    const questions = await getAllQuestions(skip, limit);
    res.json(questions);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const getQuestionByCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryIds = req.body.categoryIds;
    const questions = await getQuestionByCategory(categoryIds);
    res.json(questions);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const getQuestionByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const question = await getQuestionById(id);
    res.json(question);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const createQuestionController = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.user as { id: string };
    const { title, options, answer, duration, level, category } = req.body;
    const question = await createQuestion(
      id,
      title,
      options,
      answer,
      duration,
      level,
      category,
    );
    res.status(201);
    res.json(question);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const updateQuestionByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, options, answer, duration, level, category } = req.body;
    const question = await updateQuestionById(
      id,
      title,
      options,
      answer,
      duration,
      level,
      category,
    );
    res.json(question);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const deleteQuestionByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await deleteQuestionById(id);
    res.json(response);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

export {
  createQuestionController,
  deleteQuestionByIdController,
  getQuestionByCategoryController,
  getQuestionByIdController,
  getQuestionsController,
  updateQuestionByIdController,
};

import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/protect.middleware';
import {
  createQuestion,
  deleteQuestionById,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
} from '../models/question/query';

const getQuestionsController = async (req: Request, res: Response) => {
  try {
    const questions = await getAllQuestions();
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
  getQuestionByIdController,
  getQuestionsController,
  updateQuestionByIdController,
};

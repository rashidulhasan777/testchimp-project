import { Request, Response } from 'express';
import {
  createQuestion,
  deleteQuestionById,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
} from '../services/question.service';

const getQuestionsController = async (req: Request, res: Response) => {
  try {
    const questions = await getAllQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

const getQuestionByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const question = await getQuestionById(id);
    res.json(question);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

const createQuestionController = async (req: Request, res: Response) => {
  try {
    const { title, options, answer, duration } = req.body;
    const question = await createQuestion(title, options, answer, duration);
    res.status(201);
    res.json(question);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

const updateQuestionByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, options, answer, duration } = req.body;
    const question = await updateQuestionById(
      id,
      title,
      options,
      answer,
      duration,
    );
    res.json(question);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

const deleteQuestionByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await deleteQuestionById(id);
    res.json(response);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

export {
  createQuestionController,
  deleteQuestionByIdController,
  getQuestionByIdController,
  getQuestionsController,
  updateQuestionByIdController,
};

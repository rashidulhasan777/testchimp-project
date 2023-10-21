import express from 'express';
import { body } from 'express-validator';
import {
  createQuestionController,
  deleteQuestionByIdController,
  getQuestionByIdController,
  getQuestionsController,
  updateQuestionByIdController,
} from '../controllers/question.controller';
import validationMiddleware from '../middlewares/validation.middleware';

const router = express.Router();

// Question Routes - /api/question
router.get('/', getQuestionsController);

router.get('/:id', getQuestionByIdController);

router.post(
  '/',
  [
    body('title').trim().escape().notEmpty().withMessage('Title is required'),
    body('options')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Options are required'),
    body('answer').trim().escape().notEmpty().withMessage('Answer is required'),
    body('duration')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Duration is required'),
    body('level')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Level is required')
      .isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
      .withMessage('Level must be one of BEGINNER, INTERMEDIATE, ADVANCED'),
    validationMiddleware,
  ],
  createQuestionController,
);

router.put(
  '/:id',
  [
    body('title').trim().escape().notEmpty().withMessage('Title is required'),
    body('options')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Options are required'),
    body('answer').trim().escape().notEmpty().withMessage('Answer is required'),
    body('duration')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Duration is required'),
    body('level')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Level is required')
      .isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
      .withMessage('Level must be one of BEGINNER, INTERMEDIATE, ADVANCED'),
    validationMiddleware,
  ],
  updateQuestionByIdController,
);

router.delete('/:id', deleteQuestionByIdController);

export default router;

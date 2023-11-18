import express from 'express';
import { body } from 'express-validator';
import {
  createQuestionController,
  deleteQuestionByIdController,
  getQuestionByIdController,
  getQuestionsController,
  updateQuestionByIdController,
  getQuestionByCategoryController,
} from '../controllers/question.controller';
import validationMiddleware from '../middlewares/validation.middleware';

const router = express.Router();

// Question Routes - /api/question
router.get('/', getQuestionsController);

router.get('/:id', getQuestionByIdController);

router.post(
  '/category',
  [
    body('categoryIds')
      .trim()
      .notEmpty()
      .withMessage('Category Ids are required')
      .isArray()
      .withMessage('Category Ids must be an array'),
    validationMiddleware,
  ],
  getQuestionByCategoryController,
);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('options')
      .trim()
      .notEmpty()
      .withMessage('Options are required')
      .isArray()
      .withMessage('Options must be an array'),
    body('answer').trim().notEmpty().withMessage('Answer is required'),
    body('duration').trim().notEmpty().withMessage('Duration is required'),
    body('level')
      .trim()
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
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('options').trim().notEmpty().withMessage('Options are required'),
    body('answer').trim().notEmpty().withMessage('Answer is required'),
    body('duration').trim().notEmpty().withMessage('Duration is required'),
    body('level')
      .trim()
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

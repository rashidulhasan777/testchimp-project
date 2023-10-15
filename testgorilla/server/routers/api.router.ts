import express from 'express';
import { body } from 'express-validator';
import {
  createQuestionController,
  deleteQuestionByIdController,
  getQuestionByIdController,
  getQuestionsController,
  updateQuestionByIdController,
} from '../controllers/question.controller';

import {
  createTestController,
  deleteTestByIdController,
  getAllTestsController,
  getTestByIdController,
  updateTestByIdController,
} from '../controllers/test.controller';

import validationMiddleware from '../middlewares/validation.middleware';

const router = express.Router();

// Question Routes - /api/question
router.get('/question', getQuestionsController);

router.get('/question/:id', getQuestionByIdController);

router.post(
  '/question',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('options').notEmpty().withMessage('Options are required'),
    body('answer').notEmpty().withMessage('Answer is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
    validationMiddleware,
  ],
  createQuestionController,
);

router.put(
  '/question/:id',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('options').notEmpty().withMessage('Options are required'),
    body('answer').notEmpty().withMessage('Answer is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
    validationMiddleware,
  ],
  updateQuestionByIdController,
);

router.delete('/question/:id', deleteQuestionByIdController);

// Test Routes - /api/test
router.get('/test', getAllTestsController);
router.get('/test/:id', getTestByIdController);

router.post(
  '/test',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('shortDescription')
      .notEmpty()
      .withMessage('Short Description is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('level')
      .notEmpty()
      .withMessage('Level is required')
      .isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
      .withMessage('Level must be one of BEGINNER, INTERMEDIATE, ADVANCED'),
    body('skills')
      .notEmpty()
      .withMessage('Skills are required')
      .isArray()
      .withMessage('Skills must be an array'),
    body('relevantRoles')
      .notEmpty()
      .withMessage('Relevant Roles are required')
      .isArray()
      .withMessage('Relevant Roles must be an array'),
    validationMiddleware,
  ],
  createTestController,
);
router.put(
  '/test/:id',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('shortDescription')
      .notEmpty()
      .withMessage('Short Description is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('level')
      .notEmpty()
      .withMessage('Level is required')
      .isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
      .withMessage('Level must be one of BEGINNER, INTERMEDIATE, ADVANCED'),
    body('skills')
      .notEmpty()
      .withMessage('Skills are required')
      .isArray()
      .withMessage('Skills must be an array'),
    body('relevantRoles')
      .notEmpty()
      .withMessage('Relevant Roles are required')
      .isArray()
      .withMessage('Relevant Roles must be an array'),
    validationMiddleware,
  ],
  updateTestByIdController,
);

router.delete('/test/:id', deleteTestByIdController);

export default router;

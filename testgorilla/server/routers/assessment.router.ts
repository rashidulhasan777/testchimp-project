import express from 'express';
import { body } from 'express-validator';
import validationMiddleware from '../middlewares/validation.middleware';

import {
  createAssessmentController,
  deleteAssessmentByIdController,
  getAllAssessmentsController,
  getAssessmentByIdController,
  updateAssessmentByIdController,
} from '../controllers/assessment.controller';

const router = express.Router();

// Assessment Routes - /api/assessment
router.get('/', getAllAssessmentsController);
router.get('/:id', getAssessmentByIdController);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('jobRole').trim().notEmpty().withMessage('Job Role is required'),
    body('categories')
      .trim()
      .notEmpty()
      .withMessage('Categories are required')
      .isArray()
      .withMessage('Categories must be an array'),
    body('questions')
      .trim()
      .notEmpty()
      .withMessage('Questions are required')
      .isArray()
      .withMessage('Questions must be an array'),
    validationMiddleware,
  ],
  createAssessmentController,
);

router.put(
  '/:id',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('jobRole').trim().notEmpty().withMessage('Job Role is required'),
    body('categories')
      .trim()
      .notEmpty()
      .withMessage('Categories are required')
      .isArray()
      .withMessage('Categories must be an array'),
    body('questions')
      .trim()
      .notEmpty()
      .withMessage('Questions are required')
      .isArray()
      .withMessage('Questions must be an array'),
    validationMiddleware,
  ],
  updateAssessmentByIdController,
);

router.delete('/:id', deleteAssessmentByIdController);

export default router;

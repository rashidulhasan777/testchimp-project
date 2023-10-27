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
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required'),
    validationMiddleware,
  ],
  createAssessmentController,
);

router.put(
  '/:id',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required'),
    validationMiddleware,
  ],
  updateAssessmentByIdController,
);

router.delete('/:id', deleteAssessmentByIdController);

export default router;

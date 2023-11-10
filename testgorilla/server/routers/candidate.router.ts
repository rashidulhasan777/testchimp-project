import express from 'express';
import { body } from 'express-validator';
import validationMiddleware from '../middlewares/validation.middleware';

import {
  createCandidateController,
  deleteCandidateByIdController,
  getAllCandidatesController,
  getCandidateByIdController,
  updateCandidateByIdController,
  getCandidateByAssessmentIdController,
  getCandidateByAssignedByIdController,
} from '../controllers/candidate.controller';

const router = express.Router();

// Assessment Routes - /api/candidate
router.get('/', getAllCandidatesController);
router.get('/:id', getCandidateByIdController);
router.get('/assessment/:assessmentId', getCandidateByAssessmentIdController);
router.get('/assignedby/:assignedById', getCandidateByAssignedByIdController);

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('assignedBy').trim().notEmpty().withMessage('Assigned By is required'),
    body('assessment').trim().notEmpty().withMessage('Assessment is required'),
    validationMiddleware,
  ],
  createCandidateController,
);

router.put(
  '/:id',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('assignedBy').trim().notEmpty().withMessage('Assigned By is required'),
    body('assessment').trim().notEmpty().withMessage('Assessment is required'),
    validationMiddleware,
  ],
  updateCandidateByIdController,
);

router.delete('/:id', deleteCandidateByIdController);

export default router;

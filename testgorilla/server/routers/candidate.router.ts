import express from 'express';
import { body } from 'express-validator';
import validationMiddleware from '../middlewares/validation.middleware';

import {
  createCandidateController,
  deleteCandidateByIdController,
  getAllCandidatesController,
  getCandidateByIdController,
  updateCandidateByIdController,
} from '../controllers/candidate.controller';

const router = express.Router();

// Assessment Routes - /api/assessment
router.get('/', getAllCandidatesController);
router.get('/:id', getCandidateByIdController);

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
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('assignedBy').trim().notEmpty().withMessage('Assigned By is required'),
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
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('assignedBy').trim().notEmpty().withMessage('Assigned By is required'),
    validationMiddleware,
  ],
  updateCandidateByIdController,
);

router.delete('/:id', deleteCandidateByIdController);

export default router;

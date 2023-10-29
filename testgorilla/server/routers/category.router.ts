import express from 'express';
import { body } from 'express-validator';

import {
  createCategoryController,
  deleteCategoryByIdController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryByIdController,
} from '../controllers/category.controller';

import validationMiddleware from '../middlewares/validation.middleware';

const router = express.Router();

// Category Routes - /api/test
router.get('/', getAllCategoriesController);
router.get('/:id', getCategoryByIdController);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('shortDescription')
      .trim()
      .notEmpty()
      .withMessage('Short Description is required'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required'),
    body('skills')
      .trim()
      .notEmpty()
      .withMessage('Skills are required')
      .isArray()
      .withMessage('Skills must be an array'),
    body('relevantRoles')
      .trim()
      .notEmpty()
      .withMessage('Relevant Roles are required'),
    body('level').trim().notEmpty().withMessage('Level is required'),
    body('type').trim().notEmpty().withMessage('Type is required'),
    validationMiddleware,
  ],
  createCategoryController,
);
router.put(
  '/:id',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('shortDescription')
      .trim()
      .notEmpty()
      .withMessage('Short Description is required'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required'),
    body('skills')
      .trim()
      .notEmpty()
      .withMessage('Skills are required')
      .isArray()
      .withMessage('Skills must be an array'),
    body('relevantRoles')
      .trim()
      .notEmpty()
      .withMessage('Relevant Roles are required'),
    body('level').trim().notEmpty().withMessage('Level is required'),
    body('type').trim().notEmpty().withMessage('Type is required'),
    validationMiddleware,
  ],
  updateCategoryByIdController,
);

router.delete('/:id', deleteCategoryByIdController);

export default router;

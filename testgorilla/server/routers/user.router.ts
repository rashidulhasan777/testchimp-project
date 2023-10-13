import express from 'express';
import { body } from 'express-validator';
import {
  loginController,
  signupController,
} from '../controllers/user.controller';
import validationMiddleware from '../middlewares/validation.middleware';

const router = express.Router();

router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    validationMiddleware,
  ],
  signupController,
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
    validationMiddleware,
  ],
  loginController,
);

export default router;

import express from 'express';
import { body } from 'express-validator';
import {
  getUserByTokenController,
  loginController,
  signupController,
} from '../controllers/user.controller';
import validationMiddleware from '../middlewares/validation.middleware';

const router = express.Router();

router.get('/', getUserByTokenController);

router.post(
  '/signup',
  [
    body('firstName')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Name is required'),
    body('lastName').trim().escape().notEmpty().withMessage('Name is required'),
    body('email').trim().escape().isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .escape()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 characters'),
    validationMiddleware,
  ],
  signupController,
);

router.post(
  '/login',
  [
    body('email').trim().escape().isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('You must supply a password'),
    validationMiddleware,
  ],
  loginController,
);

export default router;

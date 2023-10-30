import express from 'express';
import { body } from 'express-validator';
import validationMiddleware from '../middlewares/validation.middleware';
import { sendMailController } from '../controllers/email.controller';

const router = express.Router();

router.post(
  '/send',
  [
    body('email').trim().isEmail().withMessage('Email must be valid'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    validationMiddleware,
  ],
  sendMailController,
);

export default router;

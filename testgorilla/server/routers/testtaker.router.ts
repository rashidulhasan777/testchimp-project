import { createCandidateController } from '../controllers/candidate.controller';
import express from 'express';
import { getAssessmentByIdController } from '../controllers/assessment.controller';
// import { body } from 'express-validator';

const router = express.Router();

router.get('/assessment/:id', getAssessmentByIdController);
router.post('/candidate', createCandidateController);

export default router;

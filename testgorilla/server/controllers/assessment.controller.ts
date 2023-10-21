import { Request, Response } from 'express';
import { AuthRequest } from 'middlewares/protect.middleware';
import {
  createAssessment,
  deleteAssessmentById,
  getAllAssessments,
  getAssessmentById,
  updateAssessmentById,
} from '../models/assessment/query';

const getAllAssessmentsController = async (req: Request, res: Response) => {
  try {
    const assessments = await getAllAssessments();
    res.status(200).json(assessments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getAssessmentByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assessment = await getAssessmentById(id);
    res.status(200).json(assessment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createAssessmentController = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.user as { id: string };
    const { title, description, categories, candidates } = req.body;
    const assessment = await createAssessment(
      title,
      description,
      categories,
      candidates,
      id,
    );
    res.status(201).json(assessment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateAssessmentByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, categories, candidates } = req.body;
    const assessment = await updateAssessmentById(
      id,
      title,
      description,
      categories,
      candidates,
    );
    res.status(200).json(assessment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAssessmentByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assessment = await deleteAssessmentById(id);
    res.status(200).json(assessment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createAssessmentController,
  deleteAssessmentByIdController,
  getAllAssessmentsController,
  getAssessmentByIdController,
  updateAssessmentByIdController,
};
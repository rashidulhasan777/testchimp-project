import { Request, Response } from 'express';
import {
  createCandidate,
  deleteCandidateById,
  getAllCandidates,
  getCandidateById,
  updateCandidateById,
} from '../models/candidate/query';

const createCandidateController = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, assignedBy } = req.body;
    const candidate = await createCandidate(name, email, phone, assignedBy);
    res.status(201).json(candidate);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCandidatesController = async (req: Request, res: Response) => {
  try {
    const candidates = await getAllCandidates();
    res.status(200).json(candidates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getCandidateByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const candidate = await getCandidateById(id);
    res.status(200).json(candidate);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateCandidateByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, assignedBy } = req.body;
    const candidate = await updateCandidateById(
      id,
      name,
      email,
      phone,
      assignedBy,
    );
    res.status(200).json(candidate);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCandidateByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const candidate = await deleteCandidateById(id);
    res.status(200).json(candidate);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createCandidateController,
  deleteCandidateByIdController,
  getAllCandidatesController,
  getCandidateByIdController,
  updateCandidateByIdController,
};

import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/protect.middleware';
import {
  createTest,
  deleteTestById,
  getAllTests,
  getTestById,
  updateTestById,
} from '../services/test.service';

const getAllTestsController = async (req: Request, res: Response) => {
  try {
    const tests = await getAllTests();
    res.json(tests);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

const getTestByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const test = await getTestById(id);
    res.json(test);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

const createTestController = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      shortDescription,
      description,
      level,
      skills,
      relevantRoles,
    } = req.body;
    const { id } = req.user as { id: string }; // This is the user id / creator id
    const test = await createTest(
      id,
      title,
      shortDescription,
      description,
      level,
      skills,
      relevantRoles,
    );
    res.status(201);
    res.json(test);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

const updateTestByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      title,
      shortDescription,
      description,
      level,
      skills,
      relevantRoles,
    } = req.body;
    const test = await updateTestById(
      id,
      title,
      shortDescription,
      description,
      level,
      skills,
      relevantRoles,
    );
    res.json(test);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

const deleteTestByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await deleteTestById(id);
    res.json(response);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

export {
  createTestController,
  deleteTestByIdController,
  getAllTestsController,
  getTestByIdController,
  updateTestByIdController,
};

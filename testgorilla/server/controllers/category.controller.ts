import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/protect.middleware';
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from '../models/category/query';

const getAllCategoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const getCategoryByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const category = await getCategoryById(id);
    res.json(category);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const createCategoryController = async (req: AuthRequest, res: Response) => {
  try {
    // const {
    //   title,
    //   shortDescription,
    //   description,
    //   level,
    //   type,
    //   skills,
    //   relevantRoles,
    // } = req.body;
    const { id } = req.user as { id: string }; // This is the user id / creator id
    const categoryObject = { createdBy: id, ...req.body };
    const category = await createCategory(categoryObject);
    res.status(201);
    res.json(category);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const updateCategoryByIdController = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id; // This is the category id
    // const {
    //   title,
    //   shortDescription,
    //   description,
    //   level,
    //   type,
    //   skills,
    //   relevantRoles,
    // } = req.body;
    const categoryObject = { ...req.body };
    const category = await updateCategoryById(categoryId, categoryObject);
    res.json(category);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const deleteCategoryByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await deleteCategoryById(id);
    res.json(response);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

export {
  createCategoryController,
  deleteCategoryByIdController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryByIdController,
};

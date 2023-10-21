import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../models/user/query';
import {
  comparePassword,
  generateHash,
  generateToken,
  verifyToken,
} from '../utilities/auth';

const signupController = async (req: Request, res: Response) => {
  const existingUser = await findUserByEmail(req.body.email);
  if (existingUser) {
    res.status(400);
    res.json({ message: 'Email already in use' });
    return;
  }
  try {
    const hashedPassword = await generateHash(req.body.password);
    const user = await createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword,
    );
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };
    const token = generateToken(payload);
    res.status(201);
    res.cookie('jwtToken', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.json({ token });
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      res.status(400);
      res.json({ message: 'Invalid credentials' });
      return;
    }
    const isMatch = await comparePassword(req.body.password, user.password);
    if (!isMatch) {
      res.status(400);
      res.json({ message: 'Invalid credentials' });
      return;
    }
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };
    const token = generateToken(payload);
    res.status(200);
    res.cookie('jwtToken', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.json({ token });
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

const getUserByTokenController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.jwtToken;
    // console.log(token);
    if (!token) {
      res.status(404);
      res.json({ message: 'User not found' });
      return;
    }
    const user = verifyToken(token);
    if (!user) {
      res.status(404);
      res.json({ message: 'User not found' });
      return;
    }
    res.status(200);
    res.json(user);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

export { loginController, signupController, getUserByTokenController };

import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../services/user.service';
import {
  comparePassword,
  generateHash,
  generateToken,
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
      req.body.name,
      req.body.email,
      hashedPassword,
    );
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };
    const token = generateToken(payload);
    res.status(201);
    res.json({ token });
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
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
      name: user.name,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };
    const token = generateToken(payload);
    res.status(200);
    res.json({ token });
  } catch (error) {
    res.status(500);
    res.json({ message: 'Internal server error' });
  }
};

export { loginController, signupController };

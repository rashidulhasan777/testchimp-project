import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

const generateHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const generateToken = (payload: string | object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret);
};

const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as Secret);
};

export { comparePassword, generateHash, generateToken, verifyToken };

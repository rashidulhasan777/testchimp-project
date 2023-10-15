import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import protectMiddleware from './middlewares/protect.middleware';
import apiRouter from './routers/api.router';
import userRouter from './routers/user.router';

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', protectMiddleware, apiRouter);
app.use('/users', userRouter);

(async function bootstrap() {
  await mongoose.connect('mongodb://127.0.0.1:27017/testgorilla');
  console.log('Connected to DB');
  app.listen(3000, () => {
    console.log('Server is listening at http://127.0.0.1:3000');
  });
})();

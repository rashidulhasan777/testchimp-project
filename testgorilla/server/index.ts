import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import protectMiddleware from './middlewares/protect.middleware';
import assessmentRouter from './routers/assessment.router';
import candidateRouter from './routers/candidate.router';
import categoryRouter from './routers/category.router';
import emailRouter from './routers/email.router';
import questionRouter from './routers/question.router';
import userRouter from './routers/user.router';
import path from 'path';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(
  cors({
    origin: ['http://localhost:4200', 'http://localhost:3000', '*'],
    credentials: true,
  }),
);

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api/category', protectMiddleware, categoryRouter);
app.use('/api/question', protectMiddleware, questionRouter);
app.use('/api/assessment', protectMiddleware, assessmentRouter);
app.use('/api/candidate', protectMiddleware, candidateRouter);
app.use('/api/mailer', protectMiddleware, emailRouter);
app.use('/users', userRouter);

(async function bootstrap() {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server is listening at http://127.0.0.1:${PORT}`);
  });
})();

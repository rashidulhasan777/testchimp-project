import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import protectMiddleware from './middlewares/protect.middleware';
import assessmentRouter from './routers/assessment.router';
import candidateRouter from './routers/candidate.router';
import categoryRouter from './routers/category.router';
import emailRouter from './routers/email.router';
import questionRouter from './routers/question.router';
import userRouter from './routers/user.router';
import testtakerRouter from './routers/testtaker.router';

config();

const app = express();
const PORT = process.env.PORT || 3000;

const forceSsl = function (req: any, res: any, next: any) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(forceSsl);

app.use(
  cors({
    origin: [
      'https://desolate-plains-88651-83ad369fb287.herokuapp.com/',
      'https://testchimp.me/',
    ],
    credentials: true,
  }),
);

app.use(express.static(path.join(__dirname, 'client')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/api/category', protectMiddleware, categoryRouter);
app.use('/api/question', protectMiddleware, questionRouter);
app.use('/api/assessment', protectMiddleware, assessmentRouter);
app.use('/api/candidate', protectMiddleware, candidateRouter);
app.use('/api/mailer', protectMiddleware, emailRouter);
app.use('/api/users', userRouter);
app.use('/api/testtaker', testtakerRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

(async function bootstrap() {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
})();

import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import protectMiddleware from './middlewares/protect.middleware';
import router from './routers/user.router';

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', router);

app.get('/', protectMiddleware, (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});

import { Request, Response } from 'express';
import { sendMail } from '../utilities/mail';

const sendMailController = async (req: Request, res: Response) => {
  try {
    const { email, subject, message } = req.body;
    const info = await sendMail(email, subject, message);
    res.json(info);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
};

export { sendMailController };

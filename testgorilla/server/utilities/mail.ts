import dotenv from 'dotenv';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
dotenv.config();
const mailGun = new Mailgun(formData);
const mg = mailGun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

export const sendMail = (email: string, subject: string, message: string) => {
  mg.messages
    .create('sandbox7bc0eaa99aa24155b35a27c616c16444.mailgun.org', {
      from: 'Md Rashidul Hasan <rashidul@sandbox7bc0eaa99aa24155b35a27c616c16444.mailgun.org>',
      to: [email],
      subject: subject,
      text: message,
    })
    .then((msg) => {
      console.log(msg);
      return msg;
    }) // logs response data
    .catch((err) => {
      console.log(err);
      return err;
    });
};

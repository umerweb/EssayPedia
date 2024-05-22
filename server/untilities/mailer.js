import nodemailer from 'nodemailer';
import 'dotenv/config';

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.auth_user,
      pass: process.env.auth_user_pass,
    },
  });

  const mailOptions = {
    from: process.env.email_from,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: Email Verification Email ' + info.response);
    return info.response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};




export default sendEmail;


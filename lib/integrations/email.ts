import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export async function sendOutboundEmail(to: string, subject: string, html: string) {
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: process.env.EMAIL_FROM!, to, subject, html });
    return { provider: 'resend' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });

  await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
  return { provider: 'smtp' };
}

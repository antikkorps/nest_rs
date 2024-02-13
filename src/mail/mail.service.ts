import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });
    console.log(this.transporter);
    console.log('Mail service initialized');
  }

  async sendConfirmationEmail(user: any, token: string) {
    const confirmationLink = `${process.env.BASE_URL}?token=${token}`;
    const emailBody = `Hello ${user.firstName},\n\nWelcome to Inkagram! Please click on the following link to confirm your email address: ${confirmationLink}\n\nRegards,\nThe Team`;
    const emailFrom = process.env.MAIL_FROM;

    await this.transporter.sendMail({
      from: emailFrom,
      to: user.email,
      subject: 'Welcome user! Confirm your Email',
      text: emailBody,
    });
    console.log(emailBody);
  }

  async resetPasswordLink(user: any, resetToken: string) {
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
    const emailBody = `Hello ${user.firstName},\n\nYou have requested to reset your password. Please click on the following link to reset your password: ${resetLink}\n\nRegards,\nThe Team`;
    const emailFrom = process.env.MAIL_FROM;
    try {
      await this.transporter.sendMail({
        from: emailFrom,
        to: user.email,
        subject: 'Reset your password',
        text: emailBody,
      });
    } catch (error) {
      console.error('Erreur sending mail', error);
      throw new Error('mail was not send');
    }
  }
}

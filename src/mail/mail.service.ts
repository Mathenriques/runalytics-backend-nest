import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTestEmail() {
    try {
      await this.mailerService.sendMail({
        from: 'Runalytics <theusitosgames@outlook.com>',
        to: 'math.marqui@gmail.com',
        subject: `How to Send Emails with Nodemailer`,
        text: 'TESTE',
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

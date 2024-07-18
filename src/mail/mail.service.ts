import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTestEmail() {
    try {
      await this.mailerService.sendMail({
        to: 'recipient@example.com', // Replace with recipient email
        subject: 'Test Email',
        template: './test', // The template to use
        context: { // Data to be sent to template
          name: 'Recipient Name',
        },
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

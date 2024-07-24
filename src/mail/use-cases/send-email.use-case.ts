import { MailerService } from "@nestjs-modules/mailer";
import { SendEmailDto } from "../dtos/send-email.dto";
import { Inject } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';

export class SendEmailUseCase {
  constructor(
    @Inject(MailerService)
    private readonly mailerService: MailerService
  ) {}

  async execute(sendEmailDto: SendEmailDto) {
    const { email, subject, variables, templateName } = sendEmailDto;

    try {
      const templatePath = path.resolve(__dirname, '..', 'templates', `${templateName}.html`);
      let html = fs.readFileSync(templatePath, 'utf8');

      // Substitui as variáveis no template
      Object.keys(variables).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, variables[key]);
      });

      await this.mailerService.sendMail({
        from: 'Runalytics <theusitosgames@outlook.com>',
        to: email,
        subject,
        html
      });
      
      return {
        message: "Email sent with success"
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
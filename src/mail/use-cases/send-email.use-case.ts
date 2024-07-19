import { MailerService } from "@nestjs-modules/mailer";
import { SendEmailDto } from "../dtos/send-email.dto";
import { Inject } from "@nestjs/common";

export class SendEmailUseCase {
  constructor(
    @Inject(MailerService)
    private readonly mailerService: MailerService
  ) {}

  async execute(sendEmailDto: SendEmailDto) {
    const { email, subject, text } = sendEmailDto;

    try {
      await this.mailerService.sendMail({
        from: 'Runalytics <theusitosgames@outlook.com>',
        to: email,
        subject,
        text
      });
      
      return {
        message: "Email sent with success"
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
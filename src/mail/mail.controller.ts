import { Controller, Get } from '@nestjs/common';
import { EmailService } from './mail.service';
import { isPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly emailService: EmailService) {}

  @isPublic()
  @Get('send-email')
  async sendEmail() {
    await this.emailService.sendTestEmail();
    return 'Email sent';
  }
}

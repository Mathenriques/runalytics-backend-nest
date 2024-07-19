import { Body, Controller, Get, Inject } from '@nestjs/common';
import { isPublic } from 'src/auth/decorators/is-public.decorator';
import { SendEmailUseCase } from './use-cases/send-email.use-case';
import { SendEmailDto } from './dtos/send-email.dto';

@Controller('mail')
export class MailController {

  @Inject(SendEmailUseCase)
  private readonly sendEmailUseCase: SendEmailUseCase;

  @Get('send-email')
  async sendEmail(@Body() bodyData: SendEmailDto) {
    return await this.sendEmailUseCase.execute(bodyData);
  }
}

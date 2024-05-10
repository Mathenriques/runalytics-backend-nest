import { Controller, Get } from '@nestjs/common';
import { isPublic } from './auth/decorators/is-public.decorator';

@Controller()
export class AppController {
  @isPublic()
  @Get()
  helloWorld() {
    return 'Hello World';
  }
}

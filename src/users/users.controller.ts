import { Body, Controller, Inject, Post } from '@nestjs/common';
import { isPublic } from 'src/auth/decorators/is-public.decorator';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpUseCase } from './use-cases/sign-up.use-case';

@Controller('users')
export class UsersController {
  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;

  @isPublic()
  @Post()
  signup(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }
}

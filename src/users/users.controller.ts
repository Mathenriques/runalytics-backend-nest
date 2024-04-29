import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { isPublic } from 'src/auth/decorators/is-public.decorator';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { GetUserProfileUseCase } from './use-cases/get-user-profile.use-case';

@Controller('users')
export class UsersController {
  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;

  @Inject(GetUserProfileUseCase)
  private readonly getUserProfileUseCase: GetUserProfileUseCase;

  @isPublic()
  @Post()
  signup(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @Get(':id')
  getUserData(@Param('id') id: string) {
    return this.getUserProfileUseCase.execute(id);
  }
}

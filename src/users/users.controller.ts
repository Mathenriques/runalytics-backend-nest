import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { isPublic } from 'src/auth/decorators/is-public.decorator';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { GetUserProfileUseCase } from './use-cases/get-user-profile.use-case';
import { RemoveUserUseCase } from './use-cases/remove-user.use-case';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { ArrayQuery } from './repositories/IUserRepository';
import { GenerateRecoveryCode } from './use-cases/generate-code-restore-password.use-case';

@Controller('users')
export class UsersController {
  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;

  @Inject(GetUserProfileUseCase)
  private readonly getUserProfileUseCase: GetUserProfileUseCase;

  @Inject(GetAllUsersUseCase)
  private readonly getAllUsersUseCase: GetAllUsersUseCase;

  @Inject(RemoveUserUseCase)
  private readonly removeUserUseCase: RemoveUserUseCase;
  
  @Inject(GenerateRecoveryCode)
  private readonly generateRecoveryCode: GenerateRecoveryCode;

  @isPublic()
  @Post()
  signup(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @Get(':id')
  getUserData(@Param('id') id: string) {
    return this.getUserProfileUseCase.execute(id);
  }

  @Get()
  getAllUsers(@Query() query: ArrayQuery) {
    return this.getAllUsersUseCase.execute(query);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.removeUserUseCase.execute(id);
  }

  @Get('email-recovery')
  sendEmailRecoverPassword(@Body('email') email: string) {
    const data = this.generateRecoveryCode.execute(email);
    console.log(data);
  }
}

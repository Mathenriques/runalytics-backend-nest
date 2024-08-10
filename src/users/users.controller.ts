import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
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
import { ValidateCodeRestorePasswordUseCase } from './use-cases/validate-code-restore-password.use-case';
import { ResetPasswordUseCase } from './use-cases/restore-password.use-case';
import { RestorePasswordDto } from './dtos/restore-password.dto';

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

  @Inject(ValidateCodeRestorePasswordUseCase)
  private readonly validateCode: ValidateCodeRestorePasswordUseCase;

  @Inject(ResetPasswordUseCase)
  private readonly restorePasswordUseCase: ResetPasswordUseCase;

  @isPublic()
  @Post()
  signup(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @Get('profile/:id')
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

  @isPublic()
  @Post('validate-code')
  verifyCodePassword(@Body('code') code: string) {
    return this.validateCode.execute(code);
  }

  @isPublic()
  @Patch('restore-password')
  restorePassword(@Body() restoreData: RestorePasswordDto) {
    return this.restorePasswordUseCase.execute(
      restoreData.email,
      restoreData.password,
      restoreData.code,
    );
  }
}

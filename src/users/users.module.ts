import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { ValidateUserUseCase } from './use-cases/validate-user.use-case';
import { UsersController } from './users.controller';
import { GetUserProfileUseCase } from './use-cases/get-user-profile.use-case';
import { RemoveUserUseCase } from './use-cases/remove-user.use-case';
import { UserTypeOrmRepository } from './repositories/typeorm/user.repository';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { GenerateRecoveryCode } from './use-cases/generate-code-restore-password.use-case';
import { SendEmailUseCase } from 'src/mail/use-cases/send-email.use-case';
import { CodeTypeOrmRepository } from './repositories/typeorm/code.repository';
import { Code } from './entities/codes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Code])
  ],
  providers: [
    SignUpUseCase,
    ValidateUserUseCase,
    GetUserProfileUseCase,
    RemoveUserUseCase,
    GetAllUsersUseCase,
    UserTypeOrmRepository,
    CodeTypeOrmRepository,
    GenerateRecoveryCode,
    SendEmailUseCase,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
    {
      provide: 'ICodeRepository',
      useExisting: CodeTypeOrmRepository,
    },
  ],
  controllers: [UsersController],
  exports: [
    TypeOrmModule.forFeature([User]),
    ValidateUserUseCase,
    UserTypeOrmRepository,
    GenerateRecoveryCode,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ],
})
export class UserModule {}

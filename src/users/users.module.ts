import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { UserTypeOrmRepository } from './repositories/typeorm/user.repository';
import { ValidateUserUseCase } from './use-cases/validate-user.use-case';
import { UsersController } from './users.controller';
import { GetUserProfileUseCase } from './use-cases/get-user-profile.use-case';
import { RemoveUserUseCase } from './use-cases/remove-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    SignUpUseCase,
    ValidateUserUseCase,
    GetUserProfileUseCase,
    RemoveUserUseCase,
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ],
  controllers: [UsersController],
  exports: [
    TypeOrmModule.forFeature([User]),
    ValidateUserUseCase,
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ],
})
export class UserModule {}

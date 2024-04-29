import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { UserTypeOrmRepository } from './repositories/typeorm/user.repository';
import { ValidateUserUseCase } from './use-cases/validate-user.use-case';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    SignUpUseCase,
    ValidateUserUseCase,
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

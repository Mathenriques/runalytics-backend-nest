import { Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/IUserRepository';
import * as bcrypt from 'bcrypt';

export class ValidateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error('User not exists!');
    }

    const checkIfPasswordMatches = await bcrypt.compare(
      password,
      user.password_hash,
    );

    if (!checkIfPasswordMatches) {
      throw new Error('Password wrong!');
    }

    return {
      ...user,
      password_hash: undefined,
    };
  }
}

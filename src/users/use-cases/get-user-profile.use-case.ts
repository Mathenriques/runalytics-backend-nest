import { User } from '../entities/user.entity';
import { IUserRepository } from '../repositories/IUserRepository';
import { Inject } from '@nestjs/common';

export class GetUserProfileUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    return {
      ...user,
      password_hash: undefined,
    };
  }
}

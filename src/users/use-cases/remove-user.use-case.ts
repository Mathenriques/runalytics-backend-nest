import { Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/IUserRepository';

export class RemoveUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new Error('User not exists!');
    }

    if (user.isAdmin && (await this.userRepo.countAdminUsers()) <= 1) {
      throw new Error('The system needs at least one administrator');
    }

    const rowsAffected = await this.userRepo.removeUser(id);

    return {
      rowsAffected,
    };
  }
}

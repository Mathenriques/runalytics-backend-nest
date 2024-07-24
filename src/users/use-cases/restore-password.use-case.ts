import { Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/IUserRepository';
import { ICodeRepository } from '../repositories/ICodeRepository';
import { hash } from 'bcrypt';

export class ResetPasswordUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    
    @Inject('ICodeRepository')
    private readonly codeRepo: ICodeRepository,
  ) {}

  async execute(email: string, password: string, code: string): Promise<boolean> {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error('User not exists!')
    }

    const password_hash = await hash(password, 10);
    
    await this.userRepo.updateUserPassword(user.id, password_hash);

    await this.codeRepo.deleteCode(code);

    return true
  }
}

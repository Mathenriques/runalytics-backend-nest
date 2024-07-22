import { IUserRepository } from '../repositories/IUserRepository';
import { Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { generateRandomSixDigitCode } from '../../utils/utils';
import { Cache } from '@nestjs/cache-manager';

export type RestorePasswordResponse = {
  code: string,
  name: string,
  message: string
}

export class GenerateRecoveryCode {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,

    @Inject('CACHE_MANAGER') 
    private cacheManager: Cache,
  ) {}

  async execute(email: string): Promise<RestorePasswordResponse> {
    const user: User = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error('User does not exists!');
    }

    const code: string = generateRandomSixDigitCode();

    await this.cacheManager.set(user.email, code);
    
    return {
      code,
      name: user.name,
      message: `Olá ${'user.name'}, aqui está seu codigo de recuperação de senha`
    };
  }
}

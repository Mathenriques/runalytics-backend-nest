import { generateRandomSixDigitCode } from 'src/utils/utils';
import { IUserRepository } from '../repositories/IUserRepository';
import { Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';

export type RestorePasswordResponse = {
  code: string,
  message: string
}

export class RestorePasswordUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(email: string): Promise<RestorePasswordResponse> {
    const user: User = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error('User does not exists!');
    }

    const code: string = generateRandomSixDigitCode();
    
    return {
      code,
      message: `Olá ${user.name}, aqui está seu codigo de recuperação de senha`
    };
  }
}

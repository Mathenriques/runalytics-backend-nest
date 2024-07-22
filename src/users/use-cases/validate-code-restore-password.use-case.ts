import { Inject } from '@nestjs/common';
import { ICodeRepository } from '../repositories/ICodeRepository';

export class ResetPasswordUseCase {
  constructor(
    @Inject('ICodeRepository')
    private readonly codeRepo: ICodeRepository,
  ) {}

  async execute(code: string): Promise<boolean> {
    const codeData = await this.codeRepo.findByCode(code);

    if (!codeData) {
      throw new Error('Code not exists!')
    }

    return true
  }
}

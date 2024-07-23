import { randomUUID } from 'crypto';

import { ICodeRepository } from '../ICodeRepository';
import { Code } from 'src/users/entities/codes.entity';

export class CodeInMemoryRepository implements ICodeRepository {
  public items: Code[] = [];


  async deleteCode(code: string): Promise<number | null> {
    this.items.filter((item) => item.code !== code);

    return 1;
  }

  async findByCode(code: string): Promise<Code> {
    const codeData = this.items.find((item) => item.code === code);

    if (!codeData) {
      return null;
    }

    return codeData;
  }

  async create(data: Code): Promise<void> {
    data.id = randomUUID();
    this.items.push(data);
  }

}

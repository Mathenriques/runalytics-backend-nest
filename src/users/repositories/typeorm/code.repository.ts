import { InjectRepository } from "@nestjs/typeorm";
import { ICodeRepository } from "../ICodeRepository";
import { Repository } from "typeorm";
import { Code } from "src/users/entities/codes.entity";

export class CodeTypeOrmRepository implements ICodeRepository {
  constructor(
    @InjectRepository(Code)
    private typeOrmRepository: Repository<Code>
  ) {}

  async create(code: Code): Promise<void> {
    await this.typeOrmRepository.save(code);
  }

  async findByCode(code: string): Promise<Code> {
    return this.typeOrmRepository.findOneBy({ code });
  }

  async deleteCode(code: string): Promise<number | null> {
    const { affected } = await this.typeOrmRepository.delete({ code });

    return affected;
  }
}
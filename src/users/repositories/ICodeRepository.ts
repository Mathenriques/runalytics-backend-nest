import { Code } from "../entities/codes.entity";

export interface ICodeRepository {
  create(code: string): Promise<Code>;
  findByCode(code: string): Promise<Code>;
  deleteCode(code: string): Promise<Code>;
}
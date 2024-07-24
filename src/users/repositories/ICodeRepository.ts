import { Code } from "../entities/codes.entity";

export interface ICodeRepository {
  create(code: Code): Promise<void>;
  findByCode(code: string): Promise<Code>;
  deleteCode(code: string): Promise<number | null>;
}
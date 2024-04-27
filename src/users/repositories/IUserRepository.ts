import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(data: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

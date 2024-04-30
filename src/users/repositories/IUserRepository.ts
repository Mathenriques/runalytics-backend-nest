import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(data: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  countAdminUsers(): Promise<number>;
  removeUser(id: string): Promise<number | null>;
}

import { User } from '../entities/user.entity';

export type ArrayQuery = {
  take: number;
  skip: number;
};

export type GetAllUsersReturn = {
  count: number;
  data: User[];
};

export interface IUserRepository {
  create(data: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  countAdminUsers(): Promise<number>;
  removeUser(id: string): Promise<number | null>;
  getAllUsers(query: ArrayQuery): Promise<GetAllUsersReturn>;
}

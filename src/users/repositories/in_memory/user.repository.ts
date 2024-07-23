import { randomUUID } from 'crypto';

import { User } from 'src/users/entities/user.entity';
import {
  ArrayQuery,
  GetAllUsersReturn,
  IUserRepository,
} from '../IUserRepository';

export class UserInMemoryRepository implements IUserRepository {
  public items: User[] = [];
  
  async getAllUsers(query: ArrayQuery): Promise<GetAllUsersReturn> {
    const users = this.items.filter(
      (item) => !item.isAdmin && item.deletedDate === null,
    );
    
    const startIndex = query.skip;
    const endIndex = query.skip + query.take;
    const usersPaginated = users.slice(startIndex, endIndex);
    
    return {
      data: usersPaginated,
      count: users.length,
    };
  }
  
  async updateUserPassword(id: string, password: string): Promise<void> {
    const index = this.items.findIndex(user => user.id === id);

    if (index !== -1) {
      this.items[index] = { ...this.items[index], password_hash: password };
    }
  }

  async countAdminUsers(): Promise<number> {
    return this.items.filter((user) => user.isAdmin).length;
  }

  async removeUser(id: string): Promise<number | null> {
    const index = this.items.findIndex((item) => item.id === id);

    this.items[index].deletedDate = new Date();

    return 1;
  }

  async findById(id: string): Promise<User> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: User): Promise<void> {
    data.id = randomUUID();
    this.items.push(data);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}

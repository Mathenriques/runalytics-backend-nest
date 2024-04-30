import { randomUUID } from 'crypto';

import { User } from 'src/users/entities/user.entity';
import { IUserRepository } from '../IUserRepository';

export class UserInMemoryRepository implements IUserRepository {
  public items: User[] = [];

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

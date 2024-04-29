import { randomUUID } from 'crypto';

import { User } from 'src/users/entities/user.entity';
import { IUserRepository } from '../IUserRepository';

export class UserInMemoryRepository implements IUserRepository {
  public items: User[] = [];

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

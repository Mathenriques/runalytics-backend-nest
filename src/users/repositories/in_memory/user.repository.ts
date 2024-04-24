import { User } from 'src/users/entities/user.entity';
import { IUserRepository } from '../IUserRepository';

export class UserInMemoryRepository implements IUserRepository {
  public items: User[] = [];

  async create(data: User): Promise<void> {
    data.id = crypto.randomUUID();
    this.items.push(data);
  }
}

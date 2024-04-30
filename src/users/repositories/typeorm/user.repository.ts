import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../IUserRepository';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepository: Repository<User>,
  ) {}

  async removeUser(id: string): Promise<number | null> {
    const { affected } = await this.typeOrmRepository.softDelete({ id });

    return affected;
  }

  async countAdminUsers(): Promise<number> {
    return this.typeOrmRepository.count({
      where: {
        isAdmin: true,
      },
    });
  }
  async findById(id: string): Promise<User> {
    return this.typeOrmRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.typeOrmRepository.findOneBy({ email });
  }

  async create(data: User): Promise<void> {
    await this.typeOrmRepository.save(data);
  }
}

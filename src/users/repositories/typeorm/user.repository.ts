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

  async create(data: User): Promise<void> {
    await this.typeOrmRepository.save(data);
  }
}

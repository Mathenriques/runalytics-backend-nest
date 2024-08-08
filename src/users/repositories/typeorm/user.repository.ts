import { Injectable } from '@nestjs/common';
import {
  ArrayQuery,
  GetAllUsersReturn,
  IUserRepository,
} from '../IUserRepository';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepository: Repository<User>,
  ) {}

  async updateUserPassword(id: string, password: string): Promise<void> {
    await this.typeOrmRepository.update(id, {password_hash: password})
  }

  async getAllUsers(query: ArrayQuery): Promise<GetAllUsersReturn> {
    // const take = query.take || 10;
    // const skip = (query.skip) ? (query.skip - 1) * take : 0;

    const [result, total] = await this.typeOrmRepository.findAndCount({
      where: { deletedDate: null },
      order: { name: 'ASC' },
      // take: take,
      // skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

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

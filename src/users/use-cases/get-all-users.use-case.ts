import {
  ArrayQuery,
  GetAllUsersReturn,
  IUserRepository,
} from '../repositories/IUserRepository';
import { Inject } from '@nestjs/common';

export class GetAllUsersUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(query: ArrayQuery): Promise<GetAllUsersReturn> {
    return await this.userRepo.getAllUsers(query);
  }
}

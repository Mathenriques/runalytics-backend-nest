import { SignUpDto } from '../dtos/sign-up.dto';
import { User } from '../entities/user.entity';
import { hash } from 'bcrypt';
import { IUserRepository } from '../repositories/IUserRepository';
import { Inject } from '@nestjs/common';

export class SignUpUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: SignUpDto): Promise<User> {
    const {
      name,
      email,
      password,
      gender,
      birth_date,
      diseases,
      fitness_level,
      height,
      weight,
      isAdmin,
      past_injuries,
      isOnBalancedDiet,
    } = input;

    let user: User;

    const emailAlreadyExists = await this.userRepo.findByEmail(email);

    if (emailAlreadyExists) {
      throw new Error('Email already exists');
    }

    const password_hash = await hash(password, 10);

    if (!isAdmin) {
      user = new User({
        name,
        email,
        password_hash,
        gender,
        birth_date,
        diseases,
        fitness_level,
        height,
        weight,
        past_injuries,
        isAdmin,
        isOnBalancedDiet,
      });
    } else {
      user = new User({
        name,
        email,
        password_hash,
        gender,
        birth_date,
        isAdmin,
      });
    }

    await this.userRepo.create(user);

    return {
      ...user,
      password_hash: undefined,
    };
  }
}

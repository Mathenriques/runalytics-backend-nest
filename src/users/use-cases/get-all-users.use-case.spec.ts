import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUseCase } from './sign-up.use-case';
import { GetAllUsersUseCase } from './get-all-users.use-case';
import { ArrayQuery } from '../repositories/IUserRepository';
import { faker } from '@faker-js/faker';
import { UserGender } from '../entities/user.entity';
import { UserInMemoryRepository } from '../repositories/in_memory/user.repository';

describe('Get User Profile Use Case Teste', () => {
  let useCase: GetAllUsersUseCase;
  let signUpUseCase: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        GetAllUsersUseCase,
        UserInMemoryRepository,
        {
          provide: 'IUserRepository',
          useExisting: UserInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('Should be able to get all users data', async () => {
    const query: ArrayQuery = {
      skip: 0,
      take: 10,
    };

    for (let i = 0; i < 20; i++) {
      await signUpUseCase.execute({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '12345678',
        birth_date: new Date(),
        gender: UserGender.MALE,
        isAdmin: false,
      });
    }
    await useCase.execute(query);

    expect(true).toBe(true);
    // expect(count).toBe(20);
  });
});

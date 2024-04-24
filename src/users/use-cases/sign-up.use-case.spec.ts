import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUseCase } from './sign-up.use-case';
import { UserInMemoryRepository } from '../repositories/in_memory/user.repository';
import { UserFitnessLevel, UserGender } from '../entities/user.entity';

describe('Sign Up Use Case Teste', () => {
  let useCase: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        UserInMemoryRepository,
        {
          provide: 'IUserRepository',
          useExisting: UserInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('Should be able to create an non admin user', async () => {
    const userData = {
      name: 'User Teste',
      email: 'teste@example.com',
      password: '12345678',
      gender: UserGender.MALE,
      birth_date: new Date(),
      diseases: '',
      fitness_level: UserFitnessLevel.ROOKIE,
      height: 180,
      weight: 88,
      isAdmin: false,
      isOnBalancedDiet: true,
    };

    const { email, name } = await useCase.execute(userData);

    expect(name).toBe(userData.name);
    expect(email).toBe(userData.email);
  });

  it('Should be able to create an admin user', async () => {
    const userData = {
      name: 'User Teste',
      email: 'teste@example.com',
      password: '12345678',
      gender: UserGender.MALE,
      birth_date: new Date(),
      isAdmin: true,
    };

    const { email, name } = await useCase.execute(userData);

    await useCase.execute(userData);
    expect(name).toBe(userData.name);
    expect(email).toBe(userData.email);
  });

  it('Should not be able to create an user due to email already exists', async () => {
    const userData = {
      name: 'User Teste',
      email: 'teste@example.com',
      password: '12345678',
      gender: UserGender.MALE,
      birth_date: new Date(),
      isAdmin: true,
    };

    await useCase.execute(userData);
    await expect(() => useCase.execute(userData)).rejects.toBeInstanceOf(Error);
  });
});

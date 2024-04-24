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

  it('Should be able to create an use', async () => {
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
      isAdmin: true,
      isOnBalancedDiet: true,
    };

    const { email, name, password_hash } = await useCase.execute(userData);

    expect(name).toBe(userData.name);
    expect(email).toBe(userData.email);

    console.log(password_hash);
  });
});

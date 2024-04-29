import { Test, TestingModule } from '@nestjs/testing';
import { UserInMemoryRepository } from '../repositories/in_memory/user.repository';
import { UserFitnessLevel, UserGender } from '../entities/user.entity';
import { ValidateUserUseCase } from './validate-user.use-case';
import { SignUpUseCase } from './sign-up.use-case';

describe('Validate User Use Case Test', () => {
  let useCase: ValidateUserUseCase;
  let signUpUseCase: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateUserUseCase,
        SignUpUseCase,
        UserInMemoryRepository,
        {
          provide: 'IUserRepository',
          useExisting: UserInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<ValidateUserUseCase>(ValidateUserUseCase);
    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('Should be able to validate an user', async () => {
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

    await signUpUseCase.execute(userData);
    const { email } = await useCase.execute(userData.email, userData.password);

    expect(email).toBe(userData.email);
  });

  it('Should not be able to validate an user', async () => {
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

    await expect(() =>
      useCase.execute(userData.email, userData.password),
    ).rejects.toBeInstanceOf(Error);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUseCase } from './sign-up.use-case';
import { UserInMemoryRepository } from '../repositories/in_memory/user.repository';
import { UserFitnessLevel, UserGender } from '../entities/user.entity';
import { RestorePasswordUseCase } from './restore-password.use-case';

describe('Get User Profile Use Case Teste', () => {
  let useCase: RestorePasswordUseCase;
  let signUpUseCase: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        RestorePasswordUseCase,
        UserInMemoryRepository,
        {
          provide: 'IUserRepository',
          useExisting: UserInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<RestorePasswordUseCase>(RestorePasswordUseCase);
    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('Should be able to restore user password', async () => {
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

    const { email } = await signUpUseCase.execute(userData);
    const { code, message } = await useCase.execute(email);

    expect(email).toBe(userData.email);
  });

  it('Should not be able to get data from non-existent user', async () => {
    await expect(() => useCase.execute('abcd')).rejects.toBeInstanceOf(Error);
  });
});

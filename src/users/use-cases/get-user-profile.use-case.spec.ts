import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUseCase } from './sign-up.use-case';
import { UserInMemoryRepository } from '../repositories/in_memory/user.repository';
import { UserFitnessLevel, UserGender } from '../entities/user.entity';
import { GetUserProfileUseCase } from './get-user-profile.use-case';

describe('Get User Profile Use Case Teste', () => {
  let useCase: GetUserProfileUseCase;
  let signUpUseCase: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        GetUserProfileUseCase,
        UserInMemoryRepository,
        {
          provide: 'IUserRepository',
          useExisting: UserInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetUserProfileUseCase>(GetUserProfileUseCase);
    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('Should be able to get user profile', async () => {
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

    const { id } = await signUpUseCase.execute(userData);
    const { email } = await useCase.execute(id);

    expect(email).toBe(userData.email);
  });

  it('Should not be able to get data from non-existent user', async () => {
    await expect(() => useCase.execute('abcd')).rejects.toBeInstanceOf(Error);
  });
});

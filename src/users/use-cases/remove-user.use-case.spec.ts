import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUseCase } from './sign-up.use-case';
import { UserInMemoryRepository } from '../repositories/in_memory/user.repository';
import { UserFitnessLevel, UserGender } from '../entities/user.entity';
import { RemoveUserUseCase } from './remove-user.use-case';

describe('Remove User Use Case Teste', () => {
  let useCase: RemoveUserUseCase;
  let signUpUseCase: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        RemoveUserUseCase,
        UserInMemoryRepository,
        {
          provide: 'IUserRepository',
          useExisting: UserInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<RemoveUserUseCase>(RemoveUserUseCase);
    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('Should be able to remove an user', async () => {
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
    const { result } = await useCase.execute(id);

    expect(result).toBe(true);
  });

  it('Should not be able to remove a non-existent user', async () => {
    await expect(() => useCase.execute('abcd')).rejects.toBeInstanceOf(Error);
  });

  it('Should not be able to remove an admin user when its the only one', async () => {
    const userData = {
      name: 'User Teste',
      email: 'teste@example.com',
      password: '12345678',
      gender: UserGender.MALE,
      birth_date: new Date(),
      isAdmin: true,
    };

    const { id } = await signUpUseCase.execute(userData);
    await expect(() => useCase.execute(id)).rejects.toBeInstanceOf(Error);
  });
});

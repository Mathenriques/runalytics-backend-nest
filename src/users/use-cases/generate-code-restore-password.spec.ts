import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUseCase } from './sign-up.use-case';
import { UserInMemoryRepository } from '../repositories/in_memory/user.repository';
import { UserFitnessLevel, UserGender } from '../entities/user.entity';
import { GenerateRecoveryCode } from './generate-code-restore-password.use-case';
import { CodeInMemoryRepository } from '../repositories/in_memory/code.repository';

describe('Get User Profile Use Case Teste', () => {
  let useCase: GenerateRecoveryCode;
  let signUpUseCase: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        GenerateRecoveryCode,
        UserInMemoryRepository,
        CodeInMemoryRepository,
        {
          provide: 'IUserRepository',
          useExisting: UserInMemoryRepository,
        },
        {
          provide: 'ICodeRepository',
          useExisting: CodeInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<GenerateRecoveryCode>(GenerateRecoveryCode);
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

    expect(code.length).toBe(6);
    expect(message).toBe(`Olá ${userData.name}, aqui está seu codigo de recuperação de senha`);
  });

  it('Should not be able to get data from non-existent user', async () => {
    await expect(() => useCase.execute('abcd')).rejects.toBeInstanceOf(Error);
  });
});

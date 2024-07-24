import { Test, TestingModule } from "@nestjs/testing";
import { CodeInMemoryRepository } from "../repositories/in_memory/code.repository";
import { UserInMemoryRepository } from "../repositories/in_memory/user.repository";
import { ResetPasswordUseCase } from "./restore-password.use-case";
import { SignUpUseCase } from "./sign-up.use-case";
import { UserFitnessLevel, UserGender } from "../entities/user.entity";
import { GenerateRecoveryCode } from "./generate-code-restore-password.use-case";

describe('Restore User Password', () => {
  let useCase: ResetPasswordUseCase;
  let signUpUseCase: SignUpUseCase;
  let generateCode: GenerateRecoveryCode;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        ResetPasswordUseCase,
        UserInMemoryRepository,
        GenerateRecoveryCode,
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

    useCase = module.get<ResetPasswordUseCase>(ResetPasswordUseCase);
    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
    generateCode = module.get<GenerateRecoveryCode>(GenerateRecoveryCode);
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
    const { code } = await generateCode.execute(email);
    const result = await useCase.execute(email, 'abcdefgh', code);

    expect(result).toBe(true);
  });

  it('Should not be able to restore user password with user that not exist', async () => {
    await expect(() =>
      useCase.execute('math.marqui@gmail.com', '1234', '1234'),
    ).rejects.toBeInstanceOf(Error);
  });
})
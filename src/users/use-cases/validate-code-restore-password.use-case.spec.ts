import { Test, TestingModule } from "@nestjs/testing";
import { CodeInMemoryRepository } from "../repositories/in_memory/code.repository";
import { ValidateCodeRestorePasswordUseCase } from "./validate-code-restore-password.use-case"
import { GenerateRecoveryCode } from "./generate-code-restore-password.use-case";
import { SignUpUseCase } from "./sign-up.use-case";
import { UserFitnessLevel, UserGender } from "../entities/user.entity";
import { UserInMemoryRepository } from "../repositories/in_memory/user.repository";

describe('Validade Code Restore Password Use Case Test', () => {
  let useCase: ValidateCodeRestorePasswordUseCase;
  let generateCode: GenerateRecoveryCode;
  let signUp: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateCodeRestorePasswordUseCase,
        GenerateRecoveryCode,
        SignUpUseCase,
        CodeInMemoryRepository,
        UserInMemoryRepository,
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

    useCase = module.get<ValidateCodeRestorePasswordUseCase>(ValidateCodeRestorePasswordUseCase);
    generateCode = module.get<GenerateRecoveryCode>(GenerateRecoveryCode);
    signUp = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('Should be able to validate an 6 digit code', async () => {
    const userData = {
      name: 'User Teste',
      email: 'teste@example.com',
      password: '12345678',
      gender: UserGender.MALE,
      birth_date: new Date(),
      diseases: '',
      fitness_level: UserFitnessLevel.ROOKIE,
      past_injuries: 'Inflamação do tendão patelar do joelho esquerdo',
      height: 180,
      weight: 88,
      isAdmin: false,
      isOnBalancedDiet: true,
    };

    const { email } = await signUp.execute(userData);

    const { code } = await generateCode.execute(email);

    const response = await useCase.execute(code);

    expect(response).toBe(true);
  })

  it('Should not be able to validate an 6 digit code', async () => {
    await expect(() => useCase.execute('abcdef')).rejects.toBeInstanceOf(Error);
  });
})
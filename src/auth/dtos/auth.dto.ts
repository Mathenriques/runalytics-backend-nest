import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}

import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RestorePasswordDto {
  @IsEmail()
  email: string;
  
  @IsEmail()
  code: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
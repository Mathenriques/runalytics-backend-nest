import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserFitnessLevel, UserGender } from '../entities/user.entity';

export class SignUpDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsEnum(UserGender)
  gender: UserGender;

  @IsDate()
  birth_date: Date;

  @IsString()
  @IsOptional()
  diseases?: string;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsEnum(UserFitnessLevel)
  @IsOptional()
  fitness_level?: UserFitnessLevel;

  @IsBoolean()
  @IsOptional()
  isOnBalancedDiet?: boolean;

  @IsBoolean()
  isAdmin: boolean;
}

import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
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
  diseases: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsEnum(UserFitnessLevel)
  fitness_level: UserFitnessLevel;

  @IsBoolean()
  isOnBalancedDiet: boolean;

  @IsBoolean()
  isAdmin: boolean;
}

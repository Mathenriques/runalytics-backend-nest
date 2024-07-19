import {IsEmail, IsString} from 'class-validator';

export class SendEmailDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  text: string;

  @IsString()
  subject: string;
}

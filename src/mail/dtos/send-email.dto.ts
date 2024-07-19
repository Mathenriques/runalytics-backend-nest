import {IsArray, IsEmail, IsObject, IsString} from 'class-validator';

export class SendEmailDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  subject: string;


  @IsString()
  templateName: string;

  @IsObject()
  variables: object;
}

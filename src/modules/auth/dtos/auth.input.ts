import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class AuthInput {
  @IsEmail()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  password: string;
}

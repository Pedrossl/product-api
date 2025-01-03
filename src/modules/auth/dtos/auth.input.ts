import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class AuthInput {
  @IsEmail()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    example: 'email@email.com',
    description: 'User email',
    format: 'email',
    nullable: false,
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '123456',
    description: 'User password',
    minLength: 1,
    nullable: false,
  })
  password: string;
}

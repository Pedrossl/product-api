import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @MaxLength(100)
  @IsNotEmpty({
    message: 'The "email" field cannot be empty',
  })
  @ApiProperty({
    example: 'email@email.com',
    description: 'User email',
    format: 'email',
    nullable: false,
  })
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({
    message: 'The "password" field cannot be empty',
  })
  @ApiProperty({
    example: '123456',
    description: 'User password',
    minLength: 1,
    nullable: false,
  })
  password: string;
}

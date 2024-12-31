import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field(() => String)
  @IsNotEmpty({
    message: 'O campo "email" não pode ser vazio',
  })
  email: string;

  @IsString()
  @Field(() => String)
  @IsNotEmpty({
    message: 'O campo "password" não pode ser vazio',
  })
  password: string;
}

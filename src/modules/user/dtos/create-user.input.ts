import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field(() => String)
  @IsNotEmpty({
    message: 'The "email" field cannot be empty',
  })
  email: string;

  @IsString()
  @Field(() => String)
  @IsNotEmpty({
    message: 'The "password" field cannot be empty',
  })
  password: string;
}

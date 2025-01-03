import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  @Field(() => String)
  @IsString()
  token: string;
}

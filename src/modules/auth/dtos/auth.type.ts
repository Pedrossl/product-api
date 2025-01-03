import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { UserLoginDTO } from 'src/modules/user/dto/user-login.dto';

@ObjectType()
export class AuthType {
  @Field(() => UserLoginDTO)
  user: UserLoginDTO;

  @Field(() => String)
  @IsString()
  token: string;
}

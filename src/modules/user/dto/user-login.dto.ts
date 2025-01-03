import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'The Email field cannot be null' })
  email: string;
}

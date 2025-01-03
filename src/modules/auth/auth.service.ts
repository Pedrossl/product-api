import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthInput } from './dtos/auth.input';
import { AuthType } from './dtos/auth.type';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { INVALID_CREDENTIALS } from 'src/common/constants/error.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(input: AuthInput): Promise<AuthType | null> {
    console.log(input);

    const user = await this.userService.findByEmail(input.email);
    console.log(user);

    const isValidPassword = user && compareSync(input.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    const token = await this.jwtToken(user);
    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthInput } from './dtos/auth.input';
import { AuthType } from './dtos/auth.type';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(input: AuthInput): Promise<AuthType | null> {
    console.log(input);

    const user = await this.userService.findByEmail(input.email);
    if (!user) {
      console.error('User not found');
      return null;
    }

    const isValidPassword = compareSync(input.password, user.password);
    if (!isValidPassword) {
      console.error('Invalid password');
      throw new Error('Invalid password');
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import {
  TOKEN_NOT_FOUND,
  USER_NOT_FOUND,
} from 'src/common/constants/error.constants';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(TOKEN_NOT_FOUND);
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = jwt.verify(token, secret) as {
        sub: string;
        email: string;
      };

      const user = await this.getUser(payload.sub);
      if (!user) {
        throw new UnauthorizedException(USER_NOT_FOUND);
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(TOKEN_NOT_FOUND);
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return null;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }

  private async getUser(id: string) {
    const user = await this.userService.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.id = :id', { id })
      .getOne();

    return user;
  }
}

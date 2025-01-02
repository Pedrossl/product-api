/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  INVALID_CONTEXT_TYPE,
  TOKEN_NOT_FOUND,
} from 'src/common/constants/error.constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(TOKEN_NOT_FOUND);
    }

    try {
      const secret =
        this.configService.get<string>('JWT_SECRET') || 'defaultSecret';
      const decoded = jwt.verify(token, secret);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException(TOKEN_NOT_FOUND);
    }
  }

  private getRequest(context: ExecutionContext): any {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }

    try {
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    } catch {
      throw new UnauthorizedException(INVALID_CONTEXT_TYPE);
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request?.headers?.['authorization'];
    if (!authHeader) {
      return null;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
}

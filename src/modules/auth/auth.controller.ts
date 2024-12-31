import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput } from './dtos/auth.input';
import { AuthType } from './dtos/auth.type';
import { IsPublic } from 'src/common/decorators/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @IsPublic()
  public async authenticated(@Body() data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return {
      user: response.user,
      token: response.token,
    };
  }
}

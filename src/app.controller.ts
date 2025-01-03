import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from './common/decorators/isPublic.decorator';
import { ApiExcludeController } from '@nestjs/swagger';
@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  healthCheck(): boolean {
    return this.appService.getHello();
  }
}

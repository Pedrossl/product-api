import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { IsPublic } from 'src/common/decorators/isPublic.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @IsPublic()
  @Post()
  async create(@Body() data: CreateUserInput): Promise<User> {
    return this.userService.create(data);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @ApiBody({ type: CreateUserInput })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.userService.softDelete(id);
  }
}

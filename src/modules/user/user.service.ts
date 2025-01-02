import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dtos/create-user.input';
import { USER_NOT_CREATED } from 'src/common/constants/error.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);

    if (!user) {
      throw new Error(USER_NOT_CREATED);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}

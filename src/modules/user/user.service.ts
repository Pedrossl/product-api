import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  USER_EXISTS,
  USER_NOT_CREATED,
  USER_NOT_FOUND,
} from 'src/common/constants/error.constants';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(input: CreateUserInput): Promise<User> {
    const userExists = await this.findByEmail(input.email);
    if (userExists) {
      throw new ConflictException(USER_EXISTS);
    }
    const user = this.userRepository.create(input);
    await this.userRepository.save(user);

    if (!user) {
      throw new InternalServerErrorException(USER_NOT_CREATED);
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const updatedUser = this.userRepository.merge(user, input);
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async softDelete(id: string): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    await this.userRepository.softDelete(id);
    return true;
  }
}

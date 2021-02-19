import { Id } from './../types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import User from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<Id> {
    try {
      const hash = await argon2.hash(createUserDto.password);
      const user = new User();
      user.email = createUserDto.email;
      user.password = hash;
      const createdUser = await this.usersRepository.save(user);
      return { id: createdUser.id };
    } catch (error) {
      throw Error(error);
    }

  }

}

import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserResponse } from './user.ro';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.usersRepo.find();

    return users.map((user) => user.toUserResponse());
  }

  async getUserById(id: string): Promise<UserResponse | null> {
    try {
      const user = await this.usersRepo.findOneBy({ id });
      return user.toUserResponse();
    } catch (err) {
      if (err.code === '22P02') {
        throw new HttpException('Invalid id', 400);
      }
      throw new NotFoundException();
    }
  }

  async getUser(user: string): Promise<UserResponse | null> {
    try {
      let email: string, username: string;
      if (user.includes('@')) {
        email = user;
      } else {
        username = user;
      }

      const found = await this.usersRepo.findOne({
        where: [{ username }, { email }],
      });

      return found.toUserResponse();
    } catch (err) {
      throw new NotFoundException();
    }
  }
}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserResponse } from './user.ro';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getallUsers(): Promise<UserResponse[]> {
    return await this.usersService.getAllUsers();
  }

  @Get('/u/:user')
  @UseGuards(new JwtAuthGuard())
  async getUserProfile(@Param('user') user: string): Promise<UserResponse> {
    return await this.usersService.getUser(user);
  }

  @Get('/:id')
  @UseGuards(new JwtAuthGuard())
  async getUserById(@Param('id') id: string): Promise<UserResponse> {
    return await this.usersService.getUserById(id);
  }
}

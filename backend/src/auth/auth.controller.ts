import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User as UserEntity } from '../users/user.entity';
import { AuthResponse } from './auth.ro';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { User } from './user-decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() data: RegisterUserDto): Promise<AuthResponse> {
    return await this.authService.register(data);
  }

  @Post('/login')
  async login(@Body() data: LoginUserDto): Promise<AuthResponse> {
    return await this.authService.login(data);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  async findCureentUser(
    @User() { username }: UserEntity,
  ): Promise<AuthResponse> {
    return await this.authService.whoami(username);
  }
}

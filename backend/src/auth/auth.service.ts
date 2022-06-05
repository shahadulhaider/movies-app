import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { AuthPayload } from './auth-payload';
import { AuthResponse } from './auth.ro';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterUserDto): Promise<AuthResponse> {
    try {
      const user = this.usersRepo.create(data);
      await user.save();

      // genrate jwt token
      const token = this.jwtService.sign({
        username: user.username,
      } as AuthPayload);

      return this.buildResponse(token, user);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Email or username already taken.');
      }
      throw err;
    }
  }

  async login(data: LoginUserDto): Promise<AuthResponse> {
    try {
      const { password, username, email } = data;
      const found = await this.usersRepo.findOne({
        where: [{ username }, { email }],
      });

      if (!found) {
        throw new NotFoundException('No user found with given credentials');
      }

      const match = await found.verifyPassword(password);

      if (!match) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.jwtService.sign({
        username: found.username,
      } as AuthPayload);

      return this.buildResponse(token, found);
    } catch (err) {
      throw err;
    }
  }

  async whoami(username: string): Promise<AuthResponse> {
    const me = await this.usersRepo.findOne({ where: { username } });

    const token = this.jwtService.sign({
      username: me.username,
    } as AuthPayload);

    return this.buildResponse(token, me);
  }

  private buildResponse(token: string, user: User): AuthResponse {
    return {
      token: `Bearer ${token}`,
      user: user.toUserResponse(),
    };
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user-decorator';
import { User as UserEntity } from 'src/users/user.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('/:title')
  @UseGuards(new JwtAuthGuard())
  async findByTitle(@Param('title') title: string): Promise<Movie> {
    return await this.moviesService.findByTitle(title);
  }

  @Post()
  @UseGuards(new JwtAuthGuard())
  async create(
    @User() user: UserEntity,
    @Body() data: CreateMovieDto,
  ): Promise<Movie> {
    return await this.moviesService.create(user, data);
  }

  @Put('/:title/favorite')
  @UseGuards(new JwtAuthGuard())
  async favorite(
    @User() user: UserEntity,
    @Param('title') title: string,
  ): Promise<Movie> {
    return await this.moviesService.favorite(user, title);
  }

  @Put('/:title/unfavorite')
  @UseGuards(new JwtAuthGuard())
  async unfavorite(
    @User() user: UserEntity,
    @Param('title') title: string,
  ): Promise<Movie> {
    return await this.moviesService.unfavorite(user, title);
  }
}

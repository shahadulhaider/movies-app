import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private moviesRepo: Repository<Movie>) {}

  async findByTitle(title: string): Promise<Movie> {
    try {
      const movie = await this.moviesRepo.findOne({ where: { title } });

      if (!movie) {
        throw new NotFoundException();
      }

      return movie;
    } catch (err) {
      throw err;
    }
  }

  async create(user: User, data: CreateMovieDto): Promise<Movie> {
    try {
      const movie = this.moviesRepo.create(data);
      if (
        movie.favoritedBy &&
        movie.favoritedBy.map((u) => u.username).includes(user.username)
      ) {
        throw new ConflictException();
      } else {
        movie.favoritedBy = [];
      }
      movie.favoritedBy.push(user);

      await movie.save();

      return movie;
    } catch (err) {
      throw err;
    }
  }

  async favorite(user: User, title: string): Promise<Movie> {
    try {
      const movie = await this.moviesRepo.findOne({
        where: { title },
        relations: { favoritedBy: true },
      });

      if (!movie) {
        throw new NotFoundException();
      }

      if (movie.favoritedBy.map((u) => u.username).includes(user.username)) {
        throw new ConflictException();
      }

      movie.favoritedBy.push(user);

      await movie.save();

      return movie;
    } catch (err) {
      throw err;
    }
  }

  async unfavorite(user: User, title: string): Promise<Movie> {
    try {
      const movie = await this.moviesRepo.findOne({
        where: { title },
        relations: { favoritedBy: true },
      });

      if (!movie) {
        throw new NotFoundException();
      }

      movie.favoritedBy = movie.favoritedBy.filter(
        (u) => u.username !== user.username,
      );

      await movie.save();

      return movie;
    } catch (err) {
      throw err;
    }
  }
}

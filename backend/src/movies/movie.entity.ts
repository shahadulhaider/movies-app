import { Exclude } from 'class-transformer';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  actors: string;

  @Column()
  director: string;

  @Column()
  genre: string;

  @Column()
  language: string;

  @Column()
  plot: string;

  @Column()
  poster: string;

  @Column()
  runtime: string;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  imdbID: string;

  @Column()
  imdbRating: string;

  @Column()
  imdbVotes: string;

  @ManyToMany(() => User, (user) => user.favorites)
  @JoinTable()
  @Exclude()
  favoritedBy: User[];
}

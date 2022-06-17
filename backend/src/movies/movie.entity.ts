import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  year: number;

  @Column()
  imdbID: string;

  @Column()
  imdbRating: number;

  @Column()
  imdbVotes: number;
}

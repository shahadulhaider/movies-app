import { hash, verify } from 'argon2';
import { classToPlain, Exclude } from 'class-transformer';
import { Movie } from 'src/movies/movie.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserResponse } from './user.ro';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToMany(() => Movie, (movie) => movie.favoritedBy, { eager: true })
  favorites: Movie[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  async verifyPassword(plain: string): Promise<boolean> {
    return await verify(this.password, plain);
  }

  toUserResponse(): UserResponse {
    return classToPlain(this) as UserResponse;
  }
}

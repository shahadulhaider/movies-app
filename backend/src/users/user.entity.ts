import { hash, verify } from 'argon2';
import { classToPlain, Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
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

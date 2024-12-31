import { Field, ID } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field({ nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Field({ nullable: true })
  deletedAt?: Date;
}

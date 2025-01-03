import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { encodePassword } from 'src/common/helpers/encode-password';
import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  @Field(() => String)
  email: string;

  @Column({
    transformer: encodePassword,
  })
  @Field(() => String)
  @HideField()
  @Exclude()
  password: string;
}

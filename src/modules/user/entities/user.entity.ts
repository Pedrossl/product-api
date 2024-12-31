import { Field, ObjectType } from '@nestjs/graphql';
import { encodePassword } from 'src/common/helpers/encode-password';
import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Column()
  @Field(() => String)
  email: string;

  @Column({
    transformer: encodePassword,
  })
  @Field(() => String)
  password: string;
}

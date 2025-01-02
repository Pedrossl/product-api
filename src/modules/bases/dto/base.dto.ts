import { Field, ID, InterfaceType, ObjectType } from '@nestjs/graphql';

@InterfaceType()
@ObjectType('Base')
export abstract class BaseDTO {
  @Field(() => ID)
  id?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}

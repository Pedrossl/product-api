import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('PageInfoDTO')
export class PageInfoDTO {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field()
  totalCount: number;
}

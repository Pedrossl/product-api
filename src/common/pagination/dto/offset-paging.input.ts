import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';

@InputType('OffsetPagingInput')
export class OffsetPagingInput {
  @IsOptional()
  @Min(0)
  @Field(() => Int, { nullable: true })
  offset?: number;

  @IsOptional()
  @Min(0)
  @Field(() => Int, { defaultValue: 10, nullable: true })
  limit?: number;
}

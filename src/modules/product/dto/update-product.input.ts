import { IsUUID } from 'class-validator';
import { CreateProductInput } from './create-product.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType('UpdateProductInput')
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String)
  @IsUUID()
  id: string;
}

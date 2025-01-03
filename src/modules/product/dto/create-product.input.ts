import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { CategoryEnum } from 'src/common/enuns/category.enum';

@InputType('CreateProductInput')
export class CreateProductInput {
  @Field(() => String)
  @IsString()
  @MaxLength(100)
  @IsNotEmpty({
    message: 'The "name" field cannot be empty',
  })
  name: string;

  @Field(() => CategoryEnum)
  @IsEnum(CategoryEnum)
  @IsNotEmpty({
    message: 'The "category" field cannot be empty',
  })
  category: CategoryEnum;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({
    message: 'The "price" field cannot be empty',
  })
  price: number;
}

import { Field, Float, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CategoryEnum } from 'src/common/enuns/category.enum';
import { BaseDTO } from 'src/modules/bases/dto/base.dto';

@ObjectType('ProductDTO')
export class ProductDTO extends BaseDTO {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => CategoryEnum)
  @IsNotEmpty()
  @IsString()
  category: CategoryEnum;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductDTO, ProductPageDTO } from './dto/product.dto';
import { OffsetPagingInput } from 'src/common/pagination/dto/offset-paging.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => ProductDTO, { name: 'createProduct' })
  async createProduct(
    @Args('input') createProductInput: CreateProductInput,
  ): Promise<ProductDTO> {
    return await this.productService.create(createProductInput);
  }

  @Query(() => ProductPageDTO)
  async findAllProducts(
    @Args('paging', { type: () => OffsetPagingInput, nullable: true })
    paging: OffsetPagingInput,
  ): Promise<ProductPageDTO> {
    return this.productService.findAll(paging);
  }

  @Query(() => ProductDTO, { name: 'findProductById' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductDTO> {
    return this.productService.findOne(id);
  }

  @Mutation(() => ProductDTO, { name: 'updateProduct' })
  async updateProduct(
    @Args('update') updateProductInput: UpdateProductInput,
  ): Promise<ProductDTO> {
    return this.productService.update(updateProductInput);
  }

  @Mutation(() => Boolean, { name: 'removeProduct' })
  async removeProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.productService.delete(id);
  }
}

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductDTO } from './dto/product.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => ProductDTO, { name: 'createProduct' })
  async createProduct(
    @Args('input') createProductInput: CreateProductInput,
  ): Promise<ProductDTO> {
    return this.productService.create(createProductInput);
  }

  @Query(() => [ProductDTO], { name: 'findAllProducts' })
  async findAll(): Promise<ProductDTO[]> {
    return this.productService.findAll();
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

  // @Mutation(() => Product, { name: 'removeProduct' })
  // async removeProduct(
  //   @Args('id', { type: () => ID }) id: string,
  // ): Promise<ProductDTO> {
  //   return this.productService.remove(id);
  // }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductDTO, ProductPageDTO } from './dto/product.dto';
import { OffsetPagingInput } from 'src/common/pagination/dto/offset-paging.input';
import { PageInfoDTO } from 'src/common/pagination/dto/page-info.dto';
import { PRODUCT_NOT_FOUND } from 'src/common/constants/error.constants';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(input: CreateProductInput): Promise<ProductDTO> {
    const product = this.productRepository.create(input);
    return await this.productRepository.save(product);
  }

  async findAll(paging: OffsetPagingInput): Promise<ProductPageDTO> {
    const { offset = 0, limit = 10 } = paging;

    const [products, totalCount] = await this.productRepository.findAndCount({
      skip: offset,
      take: limit,
    });

    const nodes = products.map((product) => ({
      ...product,
      price: Number((product.price / 100).toFixed(2)),
    }));

    const pageInfo: PageInfoDTO = {
      hasNextPage: offset + limit < totalCount,
      hasPreviousPage: offset > 0,
      totalCount,
    };

    return { nodes, pageInfo };
  }

  async findOne(id: string): Promise<ProductDTO> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return {
      ...product,
      price: this.fromCents(product.price),
    };
  }

  async update(input: UpdateProductInput): Promise<ProductDTO> {
    console.log(input);

    const product = await this.productRepository.findOne({
      where: { id: input.id },
    });
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    Object.assign(product, {
      ...input,
    });
    return this.productRepository.save(product);
  }

  async delete(id: string): Promise<boolean> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    await this.productRepository.softDelete(id);
    return true;
  }

  private fromCents(price: number): number {
    return price / 100;
  }
}

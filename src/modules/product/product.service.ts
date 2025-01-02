import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(input: CreateProductInput): Promise<ProductDTO> {
    const product = this.productRepository.create(input);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<ProductDTO[]> {
    const products = await this.productRepository.find();
    console.log(products[0].price);

    return products.map((product) => ({
      ...product,
      price: Number((product.price / 100).toFixed(2)),
    }));
  }

  async findOne(id: string): Promise<ProductDTO> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return {
      ...product,
      price: this.fromCents(product.price),
    };
  }

  async update(input: UpdateProductInput): Promise<ProductDTO> {
    const product = await this.productRepository.findOne({
      where: { id: input.id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID "${input.id}" not found`);
    }
    Object.assign(product, {
      ...input,
    });
    return this.productRepository.save(product);
  }

  private fromCents(price: number): number {
    return price / 100;
  }
}

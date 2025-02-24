import { Injectable, NotFoundException } from '@nestjs/common';
import { PricesRepository } from '../price.repository';
import { Price } from '../../../domain/prices';
import { Product } from 'src/products/domain/product';

@Injectable()
export class QueryPriceService {
  constructor(private readonly priceRepository: PricesRepository) {}

  async findById(id: Price['id']): Promise<Price> {
    const entity = await this.priceRepository.findById(id);
    if (!entity) {
      throw new NotFoundException('Price not found');
    }
    return entity;
  }
  async findAll(): Promise<Price[]> {
    return await this.priceRepository.findAll();
  }

  async findByProductId(productId: Product['id']): Promise<Price[]> {
    const entities = await this.priceRepository.findByProductId(productId);
    if (!entities) {
      throw new NotFoundException(`Prices for product ${productId} not found.`);
    }
    return entities;
  }
}

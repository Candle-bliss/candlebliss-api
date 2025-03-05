import { Product } from 'src/products/domain/product';
import { NullableType } from 'src/utils/types/nullable.type';
import { Price } from '../../../domain/prices';
import { PricesRepository } from '../price.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesEntity } from '../entities/prices.entity';
import { Repository } from 'typeorm';

export class PricesRelationalRepository implements PricesRepository {
  constructor(
    @InjectRepository(PricesEntity)
    private readonly pricesRepsitory: Repository<PricesEntity>,
  ) {}
  async create(data: Omit<Price, 'id'>): Promise<Price> {
    return await this.pricesRepsitory.save(
      this.pricesRepsitory.create({ ...data }),
    );
  }
  async update(
    id: Price['id'],
    payload: Partial<Price>,
  ): Promise<NullableType<Price>> {
    const entity = await this.findById(id);
    if (!entity) return null;
    return await this.pricesRepsitory.save(
      this.pricesRepsitory.create({ ...entity, ...payload }),
    );
  }
  async remove(id: Price['id']): Promise<void> {
    const entity = await this.pricesRepsitory.findOne({
      where: { id, isDeleted: false },
    });
    if (!entity) return;
    entity.isDeleted = true;
    await this.pricesRepsitory.save(entity);
  }
  async findById(id: Price['id']): Promise<NullableType<Price>> {
    return await this.pricesRepsitory.findOne({
      where: { id, isDeleted: false },
    });
  }
  async findAll(): Promise<Price[]> {
    return await this.pricesRepsitory.find({
      where: { isDeleted: false },
      relations: ['product'],
    });
  }
  async findByProductId(
    productId: Product['id'],
  ): Promise<NullableType<Price[]>> {
    return await this.pricesRepsitory.find({
      where: { product_detail: { id: productId }, isDeleted: false },
      relations: ['product'],
    });
  }
}

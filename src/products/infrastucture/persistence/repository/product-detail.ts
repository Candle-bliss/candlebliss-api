import { InjectRepository } from '@nestjs/typeorm';
import { NullableType } from '../../../../utils/types/nullable.type';
import { ProductDetail } from '../../../domain/product-detail';
import { ProductDetailRepository } from '../product-detail.repository';
import { ProductDetailEntity } from '../entities/detail.entity';
import { Repository } from 'typeorm';
import { Product } from '../../../domain/product';

export class ProductDetailRelationalRepository
  implements ProductDetailRepository
{
  constructor(
    @InjectRepository(ProductDetailEntity)
    private readonly detailRepository: Repository<ProductDetailEntity>,
  ) {}
  async findByIds(
    detailIds: ProductDetail['id'][],
  ): Promise<NullableType<ProductDetail[]>> {
    if (!Array.isArray(detailIds)) {
      throw new TypeError('detailIds must be an array');
    }
    const details = await Promise.all(
      detailIds.map((detailId) => {
        return this.findById(detailId);
      }),
    );
    return details.filter((detail): detail is ProductDetail => detail !== null);
  }
  create(data: ProductDetail): Promise<ProductDetail> {
    const entity = this.detailRepository.create({ ...data });
    return this.detailRepository.save(entity);
  }
  async update(
    id: ProductDetail['id'],
    payload: ProductDetail,
  ): Promise<NullableType<ProductDetail>> {
    const entity = await this.findById(id);
    if (!entity) return null;

    const updateEntity = this.detailRepository.create({
      ...entity,
      ...payload,
    });
    return this.detailRepository.save(updateEntity);
  }
  async findById(
    id: ProductDetail['id'],
  ): Promise<NullableType<ProductDetail>> {
    const entity = await this.detailRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!entity) return null;
    return entity;
  }
  async remove(id: ProductDetail['id']): Promise<void> {
    const entity = await this.detailRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!entity) return;
    entity.isDeleted = true;
    await this.detailRepository.save(entity);
  }
  async findAllByProductId(productId: Product['id']): Promise<ProductDetail[]> {
    return await this.detailRepository.find({
      where: { product: { id: productId }, isDeleted: false },
      relations: ['product'],
    });
  }
}

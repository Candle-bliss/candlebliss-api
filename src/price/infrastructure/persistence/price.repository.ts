import { Product } from 'src/products/domain/product';
import { NullableType } from 'src/utils/types/nullable.type';
import { Price } from '../../domain/prices';

export abstract class PricesRepository {
  abstract create(data: Omit<Price, 'id'>): Promise<Price>;
  abstract update(
    id: Price['id'],
    payload: Partial<Price>,
  ): Promise<NullableType<Price>>;
  abstract remove(id: Price['id']): Promise<void>;
  abstract findById(id: Price['id']): Promise<NullableType<Price>>;
  abstract findAll(): Promise<Price[]>;
  abstract findByProductId(
    productId: Product['id'],
  ): Promise<NullableType<Price[]>>;
}

import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Product } from '../../domain/product';
import { FilterProductDto, SortProductDto } from '../../dto/query-product.dto';

export abstract class ProductRepository {
  abstract create(
    data: Omit<Product, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Product>;
  abstract update(
    id: Product['id'],
    payload: Partial<Product>,
  ): Promise<NullableType<Product>>;

  abstract remove(id: Product['id']): Promise<void>;
  abstract findById(id: Product['id']): Promise<NullableType<Product>>;
  abstract findAll(): Promise<Product[]>;
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]>;
}

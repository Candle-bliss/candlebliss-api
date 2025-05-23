import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../product.repository';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Product } from '../../../domain/product';
import {
  FilterProductDto,
  SortProductDto,
} from '../../../dto/query-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ProductRelationalRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async create(data: Product): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { name: data.name, isDeleted: false },
    });
    if (product) {
      throw new NotFoundException(
        `Product with name ${data.name} already exists.`,
      );
    }
    const entity = this.productRepository.create({ ...data });
    return await this.productRepository.save(entity);
  }

  async update(
    id: Product['id'],
    payload: Partial<Product>,
  ): Promise<NullableType<Product>> {
    const entity = await this.productRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!entity) return null;
    const updatedEntity = this.productRepository.create({
      ...entity,
      ...payload,
    });
    return this.productRepository.save(updatedEntity);
  }
  async remove(id: Product['id']): Promise<void> {
    const entity = await this.productRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!entity) return;
    entity.isDeleted = true;
    await this.productRepository.save(entity);
  }
  async findById(id: Product['id']): Promise<NullableType<Product>> {
    const entity = await this.productRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!entity) return null;
    return entity;
  }
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ where: { isDeleted: false } });
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[];
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    const where: FindOptionsWhere<ProductEntity> = {};
    if (filterOptions?.type?.length) {
      where.type = filterOptions.type;
    }
    const entities = await this.productRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
    return entities;
  }
}

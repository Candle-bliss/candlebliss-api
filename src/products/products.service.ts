import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ProductRepository } from './infrastucture/persistence/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './domain/product';
import { UpdateProductDto } from './dto/update-product.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterProductDto, SortProductDto } from './dto/query-product.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ImagesService } from '../images/images.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly imagesSerivce: ImagesService,
  ) {}

  async create(
    dto: CreateProductDto,
    imagesDto: Express.Multer.File[],
  ): Promise<Product> {
    const uploadedImages =
      await this.imagesSerivce.uploadCloudImages(imagesDto);

    return this.productRepository.create({
      ...dto,
      images: uploadedImages,
    });
  }

  async update(
    id: Product['id'],
    payload: UpdateProductDto,
    imagesDto: Express.Multer.File[] | undefined,
  ): Promise<NullableType<Product>> {
    if (imagesDto) {
      const uploadedImages =
        await this.imagesSerivce.uploadCloudImages(imagesDto);
      payload = { ...payload, images: uploadedImages };
    }
    const updatedProduct = this.productRepository.update(id, payload);
    if (!updatedProduct) {
      throw new UnprocessableEntityException(
        `Product with id ${id} not found.`,
      );
    }
    return updatedProduct;
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  findOne(id: Product['id']): Promise<NullableType<Product>> {
    return this.productRepository.findById(id);
  }

  remove(id: Product['id']): Promise<void> {
    return this.productRepository.remove(id);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    return this.productRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}

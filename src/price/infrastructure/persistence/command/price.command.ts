import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PricesRepository } from '../price.repository';
import { CreatePriceDto } from '../../../dto/create-price.dto';
import { ProductRepository } from 'src/products/infrastucture/persistence/product.repository';
import { Price } from '../../../domain/prices';
import { UpdatePriceDto } from '../../../dto/update-price.dto';
import { CommandHistoryPriceSerivce } from './history-price.command';

@Injectable()
export class CommandPriceService {
  constructor(
    private readonly priceRepository: PricesRepository,
    private readonly productRepository: ProductRepository,
    private readonly commandHistoryCommand: CommandHistoryPriceSerivce,
  ) {}
  async create(createPriceDto: CreatePriceDto) {
    const product = await this.productRepository.findById(
      createPriceDto.productId,
    );
    if (!product) {
      throw new UnprocessableEntityException({
        errors: {
          productId: 'productNotFound',
        },
      });
    }
    return await this.priceRepository.create({ ...createPriceDto, product });
  }

  async update(id: Price['id'], updatePriceDto: UpdatePriceDto) {
    const { productId, ...updatePrice } = updatePriceDto;

    const price = await this.priceRepository.findById(id);
    if (!price) {
      throw new NotFoundException({
        errors: 'priceNotFound',
      });
    }

    if (!productId) {
      throw new UnprocessableEntityException({
        errors: {
          productId: 'productRequired',
        },
      });
    }

    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException({
        errors: 'productNotFound',
      });
    }

    await this.commandHistoryCommand.create({
      old_price: price.base_price,
      new_price: updatePrice.discount_price,
      changed_at: new Date(),
      changed_by: 'admin',
      productId,
    });

    return await this.priceRepository.update(id, { ...updatePrice, product });
  }
}

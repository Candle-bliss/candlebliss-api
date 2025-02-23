import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesEntity } from './persistence/entities/prices.entity';
import { HistoryPricesEntity } from './persistence/entities/history_prices.entity';
import { HistoryPricesRepository } from './persistence/history-price.repository';
import { HistoryPricesRelationalRepository } from './persistence/repository/history_prices';
import { PricesRepository } from './persistence/price.repository';
import { PricesRelationalRepository } from './persistence/repository/prices';

@Module({
  imports: [TypeOrmModule.forFeature([PricesEntity, HistoryPricesEntity])],
  providers: [
    {
      provide: HistoryPricesRepository,
      useClass: HistoryPricesRelationalRepository,
    },
    {
      provide: PricesRepository,
      useClass: PricesRelationalRepository,
    },
  ],
  exports: [HistoryPricesRepository, PricesRepository],
})
export class RelationalPricePersistenceModule {}

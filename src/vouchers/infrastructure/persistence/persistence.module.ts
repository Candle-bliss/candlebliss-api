import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VouchersEntity } from './entities/voucher.entity';
import { VoucherRepository } from '../voucher.repository';
import { VoucherRelationalRepository } from './repositories/voucher';

@Module({
  imports: [TypeOrmModule.forFeature([VouchersEntity])],
  providers: [
    {
      provide: VoucherRepository,
      useClass: VoucherRelationalRepository,
    },
  ],
  exports: [VoucherRepository],
})
export class PersistenceModule {}

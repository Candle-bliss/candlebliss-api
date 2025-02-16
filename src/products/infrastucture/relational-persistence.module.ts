import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './persistence/entities/product.entity';
import { ProductRepository } from './persistence/product.repository';
import { ProductRelationalRepository } from './persistence/repository/product';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [
    { provide: ProductRepository, useClass: ProductRelationalRepository },
  ],
  exports: [ProductRepository],
})
export class RelationalProductPersistenceModule {}

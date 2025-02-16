import { Module } from '@nestjs/common';
import { RelationalProductPersistenceModule } from './infrastucture/relational-persistence.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [RelationalProductPersistenceModule, ImagesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

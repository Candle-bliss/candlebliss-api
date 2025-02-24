import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/domain/product';

export class Price {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number, example: 30000 })
  base_price: number;

  @ApiProperty({ type: Number, example: 25000 })
  discount_price: number;

  @ApiProperty({ type: Date, example: new Date() })
  start_date: Date;

  @ApiProperty({ type: Date, example: new Date() })
  end_date: Date;

  @ApiProperty({ type: Product })
  product: Product;
}

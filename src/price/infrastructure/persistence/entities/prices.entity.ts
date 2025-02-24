import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { ProductEntity } from 'src/products/infrastucture/persistence/entities/product.entity';

@Entity('prices')
export class PricesEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Number, nullable: false })
  base_price: number;

  @Column({ type: Number, nullable: false })
  discount_price: number;

  @Column({ type: Date, nullable: false })
  start_date: Date;

  @Column({ type: Date, nullable: false })
  end_date: Date;

  @ManyToOne(() => ProductEntity, { eager: true })
  product: ProductEntity;
}

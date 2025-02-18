import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { ProductEntity } from '../../../../products/infrastucture/persistence/entities/product.entity';

@Entity({ name: 'image' })
export class ImageEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, default: '' })
  path: string;

  @Column({ type: String, default: '' })
  public_id: string;

  @ManyToOne(() => ProductEntity)
  product_images: ProductEntity;
}

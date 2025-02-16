import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { ImageEntity } from 'src/images/infrastructure/persistence/entity/image.entity';

@Entity({ name: 'product' })
export class ProductEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: false })
  description: string;

  @Column({ type: String, nullable: false })
  video?: string;

  @OneToMany(() => ImageEntity, (image) => image.product_images, {
    eager: true,
  })
  images: ImageEntity[];

  @Column({ type: String, nullable: true })
  size: string;

  @Column({ type: String, nullable: true })
  type: string;

  @Column({ type: Number, default: 0 })
  quantities: number;
}

import { CategoryEnum } from 'src/common/enuns/category.enum';
import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('product')
export class Product extends BaseEntity {
  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    enum: CategoryEnum,
  })
  category: CategoryEnum;

  @Column({
    type: 'int',
    nullable: false,
  })
  price: number;
}

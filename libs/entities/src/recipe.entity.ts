import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IngredientEntity } from './ingredient.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'recipes', schema: 'public' })
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.recipes)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @Column({ nullable: false })
  user_id: number;

  @OneToMany(() => IngredientEntity, (ingredients) => ingredients.recipe, {
    cascade: true,
    eager: true,
  })
  ingredients: IngredientEntity[];
}

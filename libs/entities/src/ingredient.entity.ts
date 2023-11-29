import { Column, Entity, ManyToOne } from 'typeorm';
import { Unit } from '../../../src/recipe/dto/recipe.dto';
import { RecipeEntity } from './recipe.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'ingredients', schema: 'public' })
export class IngredientEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: Unit })
  unit: Unit;

  @Column({ type: 'smallint' })
  quantity: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.ingredients, {
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}

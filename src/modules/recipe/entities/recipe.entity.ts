import { User } from '@app/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => Ingredient, (ingredients) => ingredients.recipe, {
    cascade: true,
    eager: true,
  })
  ingredients: Ingredient[];

  @Column({ nullable: true, type: 'varchar' })
  image: string;

  @ManyToOne(() => User, (user) => user.recipes)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
  @Column()
  user_id: number;
}

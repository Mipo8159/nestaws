import { Token } from './../../token/entities/token.entity';
import { Recipe } from '@app/modules/recipe/entities/recipe.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @Index({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Recipe, (recipes) => recipes.user)
  recipes: Recipe[];

  @OneToOne(() => Token, (token) => token.user)
  token: Token;
}

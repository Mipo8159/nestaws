import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TokenEntity } from './token.entity';
import { RoleEntity } from './role.entity';
import { Exclude } from 'class-transformer';
import { USER_STATUS } from '@app/common';
import { RecipeEntity } from './recipe.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({
    default: false,
    select: false,
  })
  super_admin: boolean;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;

  @OneToMany(() => RecipeEntity, (recipes) => recipes.user)
  recipes: RecipeEntity[];

  @OneToOne(() => TokenEntity, (token) => token.user)
  token: TokenEntity;

  @Column({ type: 'enum', enum: USER_STATUS, default: USER_STATUS.ACTIVE })
  status!: USER_STATUS;
}

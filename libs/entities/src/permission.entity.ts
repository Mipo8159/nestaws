import { Column, Entity, ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  title!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @ManyToMany(() => RoleEntity, (roles) => roles.permissions)
  roles: RoleEntity[];
}

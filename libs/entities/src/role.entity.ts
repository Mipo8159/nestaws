import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
  @ManyToMany(() => PermissionEntity, (permissions) => permissions.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: PermissionEntity[];

  @OneToMany(() => UserEntity, (users) => users.role)
  users: UserEntity[];
}

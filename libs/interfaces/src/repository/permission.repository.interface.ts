import { PermissionEntity } from '@app/entities';
import { IBaseRepository } from '@app/interfaces';

export interface IPermissionRepository
  extends IBaseRepository<PermissionEntity> {}

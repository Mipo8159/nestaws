import { UserEntity } from '@app/entities';
import { IBaseRepository } from '../base/base.repository.interface';

export interface IUserRepository extends IBaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
}

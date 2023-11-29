import { TokenEntity } from '@app/entities';
import { IBaseRepository } from '../base/base.repository.interface';

export interface ITokenRepository extends IBaseRepository<TokenEntity> {
  findToken(user_id: number): Promise<TokenEntity>;
  saveToken(user_id: number, refresh_token: string): Promise<TokenEntity>;
}

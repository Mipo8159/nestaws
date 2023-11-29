import { TokenEntity } from '@app/entities';
import { IJwtPayload } from '../shared/jwt.payload.interface';

export interface ITokenService {
  signJwtAccessToken(payload: IJwtPayload): Promise<string>;
  signJwtRefreshToken(payload: IJwtPayload): Promise<string>;
  findToken(user_id: number): Promise<TokenEntity>;
  saveToken(user_id: number, refresh_token: string): Promise<TokenEntity>;
  deleteToken(user_id: number): Promise<boolean>;
}

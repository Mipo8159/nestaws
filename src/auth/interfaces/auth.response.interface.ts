import { UserEntity } from '@app/entities';

export interface IAuthResponse {
  user: UserEntity;
  access_token: string;
}

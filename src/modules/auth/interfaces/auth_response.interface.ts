import { User } from '@app/modules/user/entities/user.entity';

export interface IAuthResponse {
  user: User;
  refresh_token?: string;
  access_token: string;
}

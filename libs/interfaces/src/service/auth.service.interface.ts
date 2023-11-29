import { UserEntity } from '@app/entities';
import { Response } from 'express';
import { UserDto } from 'src/auth/dto/register.dto';
import { IAccessResponse } from 'src/auth/interfaces/access.response.interface';
import { IAuthResponse } from 'src/auth/interfaces/auth.response.interface';

export interface IAuthService {
  register(payload: UserDto): Promise<UserEntity>;
  validate(email: string, password: string): Promise<UserEntity>;
  login(user: UserEntity, res: Response): Promise<IAuthResponse>;
  logout(user_id: number, req: Response): Promise<boolean>;
  refreshAccess(
    user: Pick<UserEntity, 'id' | 'email'>,
  ): Promise<IAccessResponse>;
}

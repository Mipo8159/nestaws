import { User } from '@app/modules/user/entities/user.entity';
import { Request } from 'express';

export interface IRequest extends Request {
  user: User;
}

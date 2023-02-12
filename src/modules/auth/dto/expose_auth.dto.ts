import { UserExposeDto } from '@app/modules/user/dto/expose_user.dto';
import { Expose, Type } from 'class-transformer';

export class AuthExposeDto {
  @Type(() => UserExposeDto)
  @Expose()
  user: UserExposeDto;

  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;
}

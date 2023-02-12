import { Expose } from 'class-transformer';

export class UserExposeDto {
  @Expose() id: string;
  @Expose() email: string;
  @Expose() avatar: string;
}

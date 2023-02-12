import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  avatar: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatedescriptionDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateRecipeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;
}

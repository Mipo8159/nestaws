import { UserExposeDto } from '@app/modules/user/dto/expose_user.dto';
import { Expose, Type } from 'class-transformer';

class Ingredient {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() unit: string;
  @Expose() quantity: number;
}

export class ExposeRecipeDto {
  @Expose() id: string;
  @Expose() description: string;
  @Expose() image: string;
  @Expose() user_id: number;

  @Type(() => UserExposeDto)
  @Expose()
  user: UserExposeDto;

  @Type(() => Ingredient)
  @Expose()
  ingredients: Ingredient[];
}

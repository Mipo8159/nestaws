import { RecipeEntity } from '@app/entities';
import { RecipeDto } from '../../../../src/recipe/dto/recipe.dto';
import { UpdateRecipeDto } from '../../../../src/recipe/dto/update_recipe.dto';

export interface IRecipeService {
  getRecipes(): Promise<RecipeEntity[]>;
  getRecipe(id: string): Promise<RecipeEntity>;
  createRecipe(user_id: number, payload: RecipeDto): Promise<RecipeEntity>;
  updateRecipe(id: string, payload: UpdateRecipeDto): Promise<RecipeEntity>;
  deleteRecipe(id: string): Promise<RecipeEntity>;
}

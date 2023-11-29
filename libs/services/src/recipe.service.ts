import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RecipeDto } from '../../../src/recipe/dto/recipe.dto';
import { UpdateRecipeDto } from '../../../src/recipe/dto/update_recipe.dto';
import { RecipeEntity } from '@app/entities';
import { IRecipeRepository, IRecipeService } from '@app/interfaces';
import { PROVIDERS } from '@app/common';

@Injectable()
export class RecipeService implements IRecipeService {
  constructor(
    @Inject(PROVIDERS.RECIPE_REPOSITORY)
    private readonly recipeRepository: IRecipeRepository,
  ) {}
  // GET RECIPES
  async getRecipes(): Promise<RecipeEntity[]> {
    return this.recipeRepository.findAll();
  }

  // GET RECIPE
  async getRecipe(id: string): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOneById(id);
    if (!recipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }
    return recipe;
  }

  // CREATE RECIPE
  async createRecipe(
    user_id: number,
    payload: RecipeDto,
  ): Promise<RecipeEntity> {
    const recipe = this.recipeRepository.create(payload);
    recipe.user_id = user_id;
    return this.recipeRepository.save(recipe);
  }

  // UPDATE RECIPE
  async updateRecipe(
    id: string,
    payload: UpdateRecipeDto,
  ): Promise<RecipeEntity> {
    const recipe = await this.getRecipe(id);
    Object.assign(recipe, payload);
    return this.recipeRepository.save(recipe);
  }

  // DELETE RECIPE
  async deleteRecipe(id: string): Promise<RecipeEntity> {
    const recipe = await this.getRecipe(id);
    return this.recipeRepository.remove(recipe);
  }
}

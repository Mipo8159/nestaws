import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { RecipeDto } from './dto/recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { RecipeRepository } from './repositories/recipe.repository';

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly s3Service: S3Service,
  ) {}

  async getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.findRecipes();
  }

  async getRecipe(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findRecipe(id);
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async createRecipe(user_id: number, recipe: RecipeDto): Promise<Recipe> {
    const newRecipe = new Recipe();
    Object.assign(newRecipe, recipe);
    newRecipe.user_id = user_id;
    return this.recipeRepository.saveRecipe(newRecipe);
  }

  async updateDescription(id: number, description: string): Promise<Recipe> {
    const recipe = await this.getRecipe(id);
    recipe.description = description || recipe.description;
    return this.recipeRepository.saveRecipe(recipe);
  }

  async deleteRecipe(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findRecipe(id);
    if (!recipe) throw new NotFoundException('Recipe not found');
    return this.recipeRepository.removeRecipe(recipe);
  }

  async uploadImage(
    user_id: number,
    recipe_id: number,
    file: Express.Multer.File,
  ) {
    const recipe = await this.getRecipe(recipe_id);

    if (recipe.user_id !== user_id) {
      throw new ForbiddenException('the recipe is not ours');
    }

    const bucketKey = `recipes/${Date.now()}`;
    const imageUrl = await this.s3Service.uploadToS3(file, bucketKey);

    recipe.image = imageUrl;
    return this.recipeRepository.saveRecipe(recipe);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async findRecipes() {
    return this.recipeRepository.find();
  }

  async findRecipe(id: number): Promise<Recipe | null> {
    return this.recipeRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  async saveRecipe(recipe: Recipe): Promise<Recipe> {
    return this.recipeRepository.save(recipe);
  }

  async removeRecipe(recipe: Recipe): Promise<Recipe> {
    return this.recipeRepository.remove(recipe);
  }
}

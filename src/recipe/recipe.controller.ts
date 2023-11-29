import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';
import { UpdateRecipeDto } from './dto/update_recipe.dto';
import { ApiTags } from '@nestjs/swagger';
import { PROVIDERS, User } from '@app/common';
import { AuthGuard } from '@nestjs/passport';
import { IRecipeService } from '@app/interfaces';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Recipe')
@Controller('recipes')
export class RecipeController {
  constructor(
    @Inject(PROVIDERS.RECIPE_SERVICE)
    private readonly recipeService: IRecipeService,
  ) {}

  @Get()
  @Throttle(20, 60)
  @HttpCode(HttpStatus.OK)
  async getRecipes() {
    return this.recipeService.getRecipes();
  }

  @Get(':id')
  @Throttle(20, 60)
  @HttpCode(HttpStatus.OK)
  async getRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.recipeService.getRecipe(id);
  }

  @Post()
  @Throttle(20, 60)
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async createRecipe(@User('id') user_id: number, @Body() payload: RecipeDto) {
    return this.recipeService.createRecipe(user_id, payload);
  }

  @Patch(':id')
  @Throttle(20, 60)
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async updateRecipe(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() payload: UpdateRecipeDto,
  ) {
    return this.recipeService.updateRecipe(id, payload);
  }

  @Delete(':id')
  @Throttle(20, 60)
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async deleteRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.recipeService.deleteRecipe(id);
  }
}

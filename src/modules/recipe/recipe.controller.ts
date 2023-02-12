import { Serialize } from '@app/shared/interceptors/serialize.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDecorator } from '../user/decorators/user.decorator';
import { ExposeRecipeDto } from './dto/expose_recipe.dto';
import { RecipeDto } from './dto/recipe.dto';
import { UpdatedescriptionDto } from './dto/update-description.dot';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @Get()
  async getRecipes() {
    return await this.recipeService.getRecipes();
  }

  @Get('/:id')
  @Serialize(ExposeRecipeDto)
  async getRecipe(@Param('id', new ParseIntPipe()) id: number) {
    return await this.recipeService.getRecipe(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createRecipe(
    @UserDecorator('id') user_id: number,
    @Body() recipeDto: RecipeDto,
  ) {
    return await this.recipeService.createRecipe(user_id, recipeDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateDescription(
    @Body() { description }: UpdatedescriptionDto,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.recipeService.updateDescription(id, description);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteRecipe(@Param('id', new ParseIntPipe()) id: number) {
    return await this.recipeService.deleteRecipe(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post('/:id/upload-image')
  async uploadImage(
    @UserDecorator('id') user_id: number,
    @Param('id', new ParseIntPipe()) recipe_id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.recipeService.uploadImage(user_id, recipe_id, file);
  }
}

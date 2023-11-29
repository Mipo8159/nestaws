import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity, RecipeEntity } from '@app/entities';
import { RecipeService } from '@app/services';
import { RecipeRepository } from '@app/repositories';
import { PROVIDERS } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity, IngredientEntity])],
  controllers: [RecipeController],
  providers: [
    {
      provide: PROVIDERS.RECIPE_SERVICE,
      useClass: RecipeService,
    },
    {
      provide: PROVIDERS.RECIPE_REPOSITORY,
      useClass: RecipeRepository,
    },
  ],
  exports: [PROVIDERS.RECIPE_REPOSITORY],
})
export class RecipeModule {}

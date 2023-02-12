import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from '../s3/s3.module';
import { Recipe } from './entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeRepository } from './repositories/recipe.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), S3Module],
  providers: [RecipeService, RecipeRepository],
  controllers: [RecipeController],
})
export class RecipeModule {}

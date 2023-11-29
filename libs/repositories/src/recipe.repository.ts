import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from '@app/entities';
import { IRecipeRepository } from '@app/interfaces';

@Injectable()
export class RecipeRepository
  extends BaseRepository<RecipeEntity>
  implements IRecipeRepository
{
  constructor(
    @InjectRepository(RecipeEntity) repository: Repository<RecipeEntity>,
  ) {
    super(repository);
  }
}

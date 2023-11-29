import { RecipeEntity } from '@app/entities';
import { IBaseRepository } from '../base/base.repository.interface';

export interface IRecipeRepository extends IBaseRepository<RecipeEntity> {}

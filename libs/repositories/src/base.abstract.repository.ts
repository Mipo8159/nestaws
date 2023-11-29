import { IBaseRepository } from '@app/interfaces';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

interface HasId {
  id: number | string;
}
export abstract class BaseRepository<T extends HasId>
  implements IBaseRepository<T>
{
  constructor(private readonly repository: Repository<T>) {}

  public async save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }
  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(data);
  }
  public create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }
  public createMany(data: DeepPartial<T>[]): T[] {
    return this.repository.create(data);
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    return this.repository.findOneBy(options);
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(filterCondition);
  }

  public async findWithRelations(id: any, relations: string[]): Promise<T> {
    return this.repository.findOne({ where: { id }, relations });
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  public async remove(data: T): Promise<T> {
    return this.repository.remove(data);
  }
  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return this.repository.preload(entityLike);
  }
}

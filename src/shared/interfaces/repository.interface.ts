import { Repository } from 'typeorm';

export interface IRepository<M extends Repository<M>> {
  save(model: M): Promise<M>;
  findOne(id: number): Promise<M | null>;
  findMany(): Promise<M[]>;
  delete(id: number): Promise<number>;
  update(ids: number[]): Promise<M>;
}

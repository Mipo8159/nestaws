import { PrimaryGeneratedColumn, BaseEntity as TORMEntity } from 'typeorm';

export abstract class BaseEntity extends TORMEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

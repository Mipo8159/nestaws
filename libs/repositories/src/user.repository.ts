import { UserEntity } from '@app/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@app/interfaces';

@Injectable()
export class UserRepository
  extends BaseRepository<UserEntity>
  implements IUserRepository
{
  private userRepository: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(repository);
    this.userRepository = repository;
  }

  // FIND BY EMAIL
  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'status', 'role'],
      relations: ['role'],
    });
  }
}

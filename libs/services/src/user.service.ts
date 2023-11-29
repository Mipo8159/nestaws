import { IUserRepository } from '@app/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '@app/entities';
import { UserDto } from 'src/auth/dto/register.dto';
import { PROVIDERS, USER_STATUS } from '@app/common';

@Injectable()
export class UserService {
  constructor(
    @Inject(PROVIDERS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  public async create(payload: UserDto): Promise<UserEntity> {
    const entity = this.userRepository.create(payload);
    return this.userRepository.save(entity);
  }

  public findWithRelations(
    id: number,
    relations: string[],
  ): Promise<UserEntity> {
    return this.userRepository.findWithRelations(id, relations);
  }

  public findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOneById(id);
  }

  public findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findByEmail(email);
  }

  public async activate(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneById(id);
    user.status = USER_STATUS.ACTIVE;
    return this.userRepository.save(user);
  }

  public async deactivate(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneById(id);
    user.status = USER_STATUS.SUSPENDED;
    return this.userRepository.save(user);
  }
}

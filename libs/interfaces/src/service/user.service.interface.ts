import { UserEntity } from '@app/entities';
import { UserDto } from 'src/auth/dto/register.dto';

export interface IUserService {
  create(payload: UserDto): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  activate(id: number): Promise<UserEntity>;
  deactivate(id: number): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity>;
  findWithRelations(id: number, relations: string[]): Promise<UserEntity>;
}

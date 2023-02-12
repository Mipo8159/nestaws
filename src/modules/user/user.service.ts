import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
  ) {}

  // SAVE
  async saveUser(dto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, dto);
    return this.userRepository.saveUser(user);
  }

  // FIND ALL
  findUsers(): Promise<User[]> {
    return this.userRepository.findUsers();
  }

  // FIND BY ID
  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findUser(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // FIND BY EMAIL
  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  // UPDATE USER
  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, dto);
    return this.userRepository.saveUser(user);
  }

  // UPLAOD AVATAR
  async uploadAvatar(user_id: number, file: Express.Multer.File) {
    const user = await this.userRepository.findUser(user_id);
    if (!user) throw new NotFoundException('User not found');

    const bucketKey = `users/${Date.now()}`;
    const fileUrl = await this.s3Service.uploadToS3(file, bucketKey);

    user.avatar = fileUrl;
    return await this.userRepository.saveUser(user);
  }
}

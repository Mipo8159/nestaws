import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from '@app/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/entities';
import { PROVIDERS } from '@app/common';
import { UserService } from '@app/services';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: PROVIDERS.USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: PROVIDERS.USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [PROVIDERS.USER_SERVICE],
})
export class UserModule {}

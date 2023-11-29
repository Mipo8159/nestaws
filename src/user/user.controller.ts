import { User } from '@app/common';
import { UserEntity } from '@app/entities';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('User')
@Controller('users')
export class UserController {
  @Get('current-user')
  @Throttle(20, 60)
  @UseGuards(AuthGuard('jwt'))
  async currentUser(@User() user: UserEntity) {
    return user;
  }
}

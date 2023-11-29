import { IAuthService } from '@app/interfaces/service/auth.service.interface';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { PROVIDERS, User } from '@app/common';
import { UserEntity } from '@app/entities';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(PROVIDERS.AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post('register')
  @Throttle(20, 60)
  @HttpCode(HttpStatus.OK)
  async register(@Body() payload: UserDto) {
    return this.authService.register(payload);
  }

  @Post('login')
  @Throttle(20, 60)
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  async login(
    @User() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(user, res);
  }

  @Post('refresh-access')
  @Throttle(20, 60)
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshAccess(@User() user: Pick<UserEntity, 'id' | 'email'>) {
    return this.authService.refreshAccess(user);
  }

  @Post('logout')
  @Throttle(20, 60)
  @UseGuards(AuthGuard('jwt-refresh'))
  async logout(
    @User('id') user_id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.authService.logout(user_id, res);
  }
}

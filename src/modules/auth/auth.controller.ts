import { Serialize } from '@app/shared/interceptors/serialize.interceptor';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthExposeDto } from './dto/expose_auth.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { IJwtResponse } from '../token/interfaces/jwt_response.interface';
import { User } from '../user/entities/user.entity';
import { UserDecorator } from '../user/decorators/user.decorator';
import { TokenService } from '../token/token.service';
import { AuthGuard } from '@nestjs/passport';
import { UserExposeDto } from '../user/dto/expose_user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  // REGISTER
  @Post('register')
  @Serialize(AuthExposeDto)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterDto,
  ) {
    const { user, access_token, refresh_token } =
      await this.authService.register(dto);

    res.cookie('refresh_token', refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return { user, access_token };
  }

  // LOGIN
  @Post('login')
  @Serialize(AuthExposeDto)
  @UseGuards(AuthGuard('local'))
  async login(
    @UserDecorator() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      await this.tokenService.generateTokens({
        id: user.id,
        email: user.email,
      });

    res.cookie('refresh_token', refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return { user, access_token };
  }

  // LOGOUT
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const { refresh_token } = req.cookies;

    const result = await this.authService.logout(refresh_token);
    res.clearCookie('refresh_token');
    return { message: result };
  }

  // REFRESH ACCESS
  @Post('refresh')
  async refreshAccess(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IJwtResponse> {
    const { refresh_token, access_token } =
      await this.authService.refreshTokens(req.cookies.refresh_token);

    res.cookie('refresh_token', refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return { access_token };
  }

  @Get('myself')
  @UseGuards(AuthGuard('jwt'))
  @Serialize(UserExposeDto)
  async findMyself(@UserDecorator() user: User) {
    return user;
  }
}

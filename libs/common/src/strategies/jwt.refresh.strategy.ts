import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload, IUserService } from '@app/interfaces';
import { UserEntity } from '@app/entities';
import { PROVIDERS } from '../constants/providers';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(PROVIDERS.USER_SERVICE) private readonly userService: IUserService,
    readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies['refresh_token'],
      ]),
      secretOrKey: config.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(payload: IJwtPayload): Promise<UserEntity> {
    const user = await this.userService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

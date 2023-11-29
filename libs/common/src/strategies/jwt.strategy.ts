import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload, IUserService } from '@app/interfaces';
import { PROVIDERS } from '../constants/providers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(PROVIDERS.USER_SERVICE) private readonly userService: IUserService,
    readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: IJwtPayload): Promise<any> {
    const user = await this.userService.findWithRelations(payload.id, ['role']);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

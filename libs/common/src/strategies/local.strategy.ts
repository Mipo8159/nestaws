import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from '@app/interfaces/service/auth.service.interface';
import { PROVIDERS } from '../constants/providers';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @Inject(PROVIDERS.AUTH_SERVICE) private readonly authService: IAuthService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validate(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

import { PROVIDERS } from '@app/common';
import { TokenEntity } from '@app/entities';
import { IJwtPayload, ITokenRepository, ITokenService } from '@app/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    @Inject(PROVIDERS.TOKEN_REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // FIND TOKEN
  async findToken(user_id: number): Promise<TokenEntity> {
    return this.tokenRepository.findToken(user_id);
  }

  // SAVE TOKEN
  async saveToken(user_id: number, refresh_token: string) {
    return this.tokenRepository.saveToken(user_id, refresh_token);
  }

  // LOGOUT
  async deleteToken(user_id: number): Promise<boolean> {
    const token = await this.findToken(user_id);
    if (!token) return false;

    return this.tokenRepository.remove(token).then((res) => {
      if (res) {
        return true;
      } else return false;
    });
  }

  // SIGN ACCESS TOKEN
  public signJwtAccessToken(payload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') + 's',
    } as JwtSignOptions);
  }

  // SIGN REFRESH TOKEN
  public signJwtRefreshToken(payload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') + 's',
    } as JwtSignOptions);
  }
}

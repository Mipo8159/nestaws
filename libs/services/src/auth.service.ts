import { InvalidCredentialsExcepion, PROVIDERS, TOKENS } from '@app/common';
import { UserEntity } from '@app/entities';
import { ITokenService, IUserService } from '@app/interfaces';
import { IAuthService } from '@app/interfaces/service/auth.service.interface';
import { ICryptoService } from '@app/interfaces/service/crypto.service.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserDto } from 'src/auth/dto/register.dto';
import { IAccessResponse } from 'src/auth/interfaces/access.response.interface';
import { IAuthResponse } from 'src/auth/interfaces/auth.response.interface';

export class AuthService implements IAuthService {
  constructor(
    @Inject(PROVIDERS.CRYPTO_SERVICE)
    private readonly cryptoService: ICryptoService,
    @Inject(PROVIDERS.USER_SERVICE) private readonly userService: IUserService,
    @Inject(PROVIDERS.TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
    private readonly config: ConfigService,
  ) {}

  // REGISTER
  async register(payload: UserDto): Promise<UserEntity> {
    const exists = await this.userService.findByEmail(payload.email);
    if (exists) {
      throw new BadRequestException('email taken');
    }
    const hash = await this.cryptoService.hash(payload.password);
    return this.userService.create({ ...payload, password: hash });
  }

  // LOGIN
  async login(user: UserEntity, res: Response): Promise<IAuthResponse> {
    const access_token = await this.tokenService.signJwtAccessToken({
      id: user.id,
      email: user.email,
    });
    const refresh_token = await this.tokenService.signJwtRefreshToken({
      id: user.id,
      email: user.email,
    });
    await this.tokenService.saveToken(user.id, refresh_token);
    res.cookie(TOKENS.REFRESH_TOKEN, refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: this.config.get('NODE_ENV') === 'production',
      maxAge: parseInt(this.config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')),
    });
    return { user, access_token };
  }

  async refreshAccess(
    user: Pick<UserEntity, 'id' | 'email'>,
  ): Promise<IAccessResponse> {
    const access_token = await this.tokenService.signJwtAccessToken({
      id: user.id,
      email: user.email,
    });
    return { access_token };
  }

  // LOGOUT
  async logout(user_id: number, res: Response): Promise<boolean> {
    return this.tokenService.deleteToken(user_id).then((response) => {
      if (response) {
        res.clearCookie(TOKENS.REFRESH_TOKEN);
        return true;
      } else return false;
    });
  }

  // VALIDATE USER
  async validate(email: string, password: string): Promise<UserEntity> {
    const validUser = await this.userService.findByEmail(email);
    if (!validUser) {
      throw new InvalidCredentialsExcepion();
    }

    const passwordValid = await this.validatePassword(
      password,
      validUser.password,
    );
    if (!passwordValid) {
      throw new InvalidCredentialsExcepion();
    }
    return validUser;
  }

  // VALIDATE PASSWORD
  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return this.cryptoService.compareHashs(password, hashedPassword);
  }
}

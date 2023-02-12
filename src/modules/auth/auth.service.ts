import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { IAuthResponse } from './interfaces/auth_response.interface';
import { TokenService } from '../token/token.service';
import { IJwtResponse } from '../token/interfaces/jwt_response.interface';
import { InvalidCredentialsExceptions } from './exceptions/invalid_credentials.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  // REGISTER
  async register(dto: RegisterDto): Promise<IAuthResponse> {
    const { email, password } = dto;
    const exist = await this.userService.findUserByEmail(email);
    if (exist) {
      throw new HttpException('Email already registered!', 400);
    }
    const passwordHash = await this.hashPassword(password);

    const user = await this.userService.saveUser({
      email,
      password: passwordHash,
    });
    const tokens = await this.tokenService.generateTokens({
      id: user.id,
      email,
    });

    return { user, ...tokens };
  }

  // VALIDATE EMAIL
  async validateEmail(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new InvalidCredentialsExceptions();
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new InvalidCredentialsExceptions();
    }

    return user;
  }

  // REFRESH TOKENS
  async refreshTokens(refresh_token: string): Promise<IJwtResponse> {
    if (!refresh_token) {
      throw new UnauthorizedException('Unauthorized');
    }
    const valid = await this.tokenService.validateRefreshToken(refresh_token);
    if (!valid) {
      throw new UnauthorizedException('Unauthorized');
    }
    const user = await this.userService.findUserById(valid.id);
    const tokens = await this.tokenService.generateTokens({
      id: user.id,
      email: user.email,
    });

    await this.tokenService.saveToken(user.id, tokens.refresh_token);
    return { ...tokens };
  }

  // HASH PASSWORD (HELPER)
  private async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  // LOG OUT
  async logout(refresh_token: string): Promise<string> {
    if (!refresh_token) {
      throw new UnauthorizedException('Unauthorized');
    }
    return await this.tokenService.removeToken(refresh_token);
  }
}

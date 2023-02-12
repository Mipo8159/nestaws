import { IJwtResponse } from './interfaces/jwt_response.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { TokenRepository } from './repositories/token.repository';
import { IJwtPayload } from './interfaces/jwt_payload.interface';
import { IJwtOptions } from './interfaces/jwt_options.interface';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // GENERATE TOKENS
  async generateTokens(payload: IJwtPayload): Promise<IJwtResponse> {
    const access_token = this.generateAccessToken(payload);
    const refresh_token = this.generateRefreshToken(payload);
    return { access_token, refresh_token };
  }

  // GENERATE ACCESS TOKEN (UTIL)
  private generateAccessToken(payload: IJwtPayload): string {
    const options: IJwtOptions = {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE'),
    };
    return this.jwtService.sign({ ...payload, type: 'access' }, options);
  }

  // GENERATE REFRESH TOKEN (UTIL)
  private generateRefreshToken(payload: IJwtPayload): string {
    const options: IJwtOptions = {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    };
    return this.jwtService.sign({ ...payload, type: 'refresh' }, options);
  }

  // FIND TOKEN IN DATABASE
  async findToken(user_id: number): Promise<Token> {
    return this.tokenRepository.findToken(user_id);
  }

  // REMOVE TOKEN
  async removeToken(refresh_token: string): Promise<string> {
    await this.tokenRepository.deleteToken(refresh_token);
    return 'logged out';
  }

  // SAVE TOKEN
  async saveToken(user_id: number, refresh_token: string) {
    const token = await this.tokenRepository.findToken(user_id);

    if (token) {
      token.refresh_token = refresh_token;
      return this.tokenRepository.saveToken(token);
    } else {
      const newToken = new Token();
      newToken.user_id = user_id;
      newToken.refresh_token = refresh_token;
      return this.tokenRepository.saveToken(newToken);
    }
  }

  // VALIDATE REFRESH TOKEN
  async validateRefreshToken(refresh_token: string): Promise<IJwtPayload> {
    try {
      return this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      return null;
    }
  }

  // VALIDATE ACCESS TOKEN
  async validateAccessToken(access_token: string): Promise<IJwtPayload> {
    try {
      return this.jwtService.verifyAsync(access_token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
    } catch (error) {
      return null;
    }
  }
}

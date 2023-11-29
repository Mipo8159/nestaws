import {
  JwtRefreshStrategy,
  JwtStrategy,
  LocalStrategy,
  PROVIDERS,
} from '@app/common';
import { AuthService, CryptoService, TokenService } from '@app/services';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from '@app/entities';
import { TokenRepository } from '@app/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    PassportModule,
    UserModule,
    PassportModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
    {
      provide: PROVIDERS.CRYPTO_SERVICE,
      useClass: CryptoService,
    },
    {
      provide: PROVIDERS.AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: PROVIDERS.TOKEN_SERVICE,
      useClass: TokenService,
    },
    {
      provide: PROVIDERS.TOKEN_REPOSITORY,
      useClass: TokenRepository,
    },
  ],
})
export class AuthModule {}

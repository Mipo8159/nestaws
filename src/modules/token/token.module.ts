import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokenRepository } from './repositories/token.repository';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), JwtModule],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}

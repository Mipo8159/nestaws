import { TokenEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.abstract.repository';
import { ITokenRepository } from '@app/interfaces';

@Injectable()
export class TokenRepository
  extends BaseRepository<TokenEntity>
  implements ITokenRepository
{
  private tokenRepository: Repository<TokenEntity>;
  constructor(
    @InjectRepository(TokenEntity) repository: Repository<TokenEntity>,
  ) {
    super(repository);
    this.tokenRepository = repository;
  }

  // FIND TOKEN
  async findToken(user_id: number): Promise<TokenEntity> {
    return this.tokenRepository.findOne({
      where: { user_id },
    });
  }

  // SAVE TOKEN
  async saveToken(
    user_id: number,
    refresh_token: string,
  ): Promise<TokenEntity> {
    const token = await this.findToken(user_id);

    if (token) {
      token.refresh_token = refresh_token;
      return this.save(token);
    } else {
      const newToken = new TokenEntity();
      newToken.refresh_token = refresh_token;
      newToken.user_id = user_id;
      return this.save(newToken);
    }
  }
}

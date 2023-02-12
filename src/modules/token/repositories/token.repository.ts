import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Token } from '../entities/token.entity';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async saveToken(token: Token): Promise<Token> {
    return this.tokenRepository.save(token);
  }

  async findToken(user_id: number): Promise<Token> {
    return this.tokenRepository.findOne({ where: { user_id } });
  }

  async deleteToken(refresh_token: string): Promise<DeleteResult> {
    return this.tokenRepository.delete({ refresh_token });
  }
}

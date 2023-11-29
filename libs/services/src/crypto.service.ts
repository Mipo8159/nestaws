import { ICryptoService } from '@app/interfaces/service/crypto.service.interface';
import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class CryptoService implements ICryptoService {
  public async hash(
    value: string | Buffer,
    saltRounds?: string | number,
  ): Promise<string> {
    const salt = saltRounds || (await genSalt(8));
    return hash(value, salt);
  }

  public async compareHashs(
    value: string | Buffer,
    encryptedValue: string,
  ): Promise<boolean> {
    return compare(value, encryptedValue);
  }
}

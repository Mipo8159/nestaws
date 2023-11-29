export interface ICryptoService {
  hash(value: string | Buffer, saltRounds?: string | number): Promise<string>;

  compareHashs(
    value: string | Buffer,
    encryptedValue: string,
  ): Promise<boolean>;
}

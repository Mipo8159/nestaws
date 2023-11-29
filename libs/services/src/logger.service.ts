import { ILoggerService } from '@app/interfaces';
import { ILoggerOptions } from '@app/logger';
import { Injectable } from '@nestjs/common';
import {
  Logger as WinstonLogger,
  createLogger,
  format,
  transports,
} from 'winston';

@Injectable()
export class LoggerService implements ILoggerService {
  private logger: WinstonLogger;
  private level: string;

  constructor({ level, service }: ILoggerOptions) {
    this.level = level;
    this.logger = createLogger({
      level,
      format: format.json(),
      defaultMeta: { service },
      transports: [
        new transports.Console({
          format: format.simple(),
        }),
      ],
    });
  }

  log(message: string): void {
    this.logger.log({ level: this.level, message });
  }
  debug(message: string): void {
    this.logger.debug(message);
  }
  warn(message: string): void {
    this.logger.warn(message);
  }
  info(message: string): void {
    this.logger.info(message);
  }
  error(message: string, ...meta: any[]): void {
    this.logger.error(message, meta);
  }
}

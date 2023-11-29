import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { PROVIDERS } from '../constants/providers';
import { ILoggerService } from '@app/interfaces';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(PROVIDERS.LOGGER_SERVICE) private readonly logger: ILoggerService,
    private readonly config: ConfigService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const isProduction = this.config.get<string>('NODE_ENV');

    this.logger.error(`Exception: ${exception}, status: ${status}`);
    res.status(status).json(
      isProduction === 'production'
        ? {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
          }
        : {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
            stackTrace: exception.stack,
          },
    );
  }
}

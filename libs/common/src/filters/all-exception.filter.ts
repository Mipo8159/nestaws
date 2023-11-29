import {
  ExceptionFilter,
  Catch,
  Inject,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PROVIDERS } from '../constants/providers';
import { ConfigService } from '@nestjs/config';
import { ILoggerService } from '@app/interfaces';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(PROVIDERS.LOGGER_SERVICE) private readonly logger: ILoggerService,
    private readonly httpAdapter: HttpAdapterHost,
    private readonly config: ConfigService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapter;
    const ctx = host.switchToHttp();

    const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(
      `Exception: ${exception.message}, status: ${exception.stack}`,
    );

    const responseBody = {
      status: httpStatus,
      message: 'Internal Server error 😒',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

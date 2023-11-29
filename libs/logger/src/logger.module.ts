import { DynamicModule, Module, Provider } from '@nestjs/common';
import { LoggerService } from '@app/services';
import { ILoggerOptions } from './interfaces/logger.interface';
import { LoggerEnum } from './interfaces/logger.enum';
import { PROVIDERS } from '@app/common';

@Module({})
export class LoggerModule {
  public static forRoot(options: ILoggerOptions): DynamicModule {
    const LoggerProvider = this.createLogger(options);
    return {
      global: true,
      module: LoggerModule,
      providers: [LoggerProvider],
      exports: [LoggerProvider],
    };
  }

  private static createLogger(options: ILoggerOptions): Provider {
    switch (options.engine) {
      case LoggerEnum.WINSTON:
        return {
          provide: PROVIDERS.LOGGER_SERVICE,
          useFactory: () => {
            return new LoggerService(options);
          },
        };
      default:
        throw new Error(`Provide correct logger provider: ${options.engine}`);
    }
  }
}

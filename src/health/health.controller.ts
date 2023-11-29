import { PROVIDERS } from '@app/common';
import { ILoggerService } from '@app/interfaces';
import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    @Inject(PROVIDERS.LOGGER_SERVICE) private logger: ILoggerService,
    private readonly health: HealthCheckService,
    private readonly httpHealth: HttpHealthIndicator,
    private readonly databaseHealth: TypeOrmHealthIndicator,
    private readonly config: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  @HttpCode(HttpStatus.OK)
  @Throttle(3, 10)
  check() {
    this.logger.debug('Health log');
    return this.health.check([
      () =>
        this.httpHealth.pingCheck(
          'docs',
          `${this.config.get('API_HOST')}/api/docs`,
        ),
      () => this.databaseHealth.pingCheck('database'),
    ]);
  }
}

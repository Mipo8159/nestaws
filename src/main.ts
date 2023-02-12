if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { AppValidationPipe } from '@app/shared/pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionsFilter } from './shared/filters/global_http.filter';
import { AllExceptionsFilter } from './shared/filters/global_exception.filter';
import { runMigrations } from './migrations/migration.runner';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get<string>('PORT');
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new AppValidationPipe());
  app.use(cookieParser());
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost),
    new HttpExceptionsFilter(config),
  );

  await runMigrations();
  await app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ILoggerService } from '@app/interfaces';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { PROVIDERS } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const config = app.get(ConfigService);
  const logger: ILoggerService = app.get(PROVIDERS.LOGGER_SERVICE);

  const options = new DocumentBuilder()
    .setTitle('NestAws Api')
    .setDescription('NestAws API description')
    .setVersion('1.0')
    .addTag('NestAws')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = config.get<number>('PORT');
  const API_HOST = config.get<string>('API_HOST');
  await app.listen(PORT, () => {
    logger.info(`Server running on ${API_HOST}`);
  });
}
bootstrap();
